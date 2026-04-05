package main

import "sync"

// Topic is the routing key for events.
type Topic string

// Event carries a topic and an arbitrary payload between producers and consumers.
type Event struct {
	Topic   Topic
	Payload any
}

// Handler processes an event and returns an error if it fails.
// It must not block — forward slow work to a buffered channel and return.
type Handler func(Event) error

// EventBridge is a thread-safe pub/sub router. Producers publish events by
// topic; all subscribers on that topic receive a copy, each dispatched in its
// own goroutine so no subscriber can stall another.
type EventBridge struct {
	mu          sync.RWMutex
	subscribers map[Topic]map[string]Handler // topic → subscriber name → handler
	onError     func(topic Topic, name string, err error)
}

// NewEventBridge creates an EventBridge. onError is called when a handler
// returns an error; pass nil to drop errors silently.
func NewEventBridge(onError func(Topic, string, error)) *EventBridge {
	return &EventBridge{
		subscribers: make(map[Topic]map[string]Handler),
		onError:     onError,
	}
}

// Subscribe registers h under name on topic. Names must be unique per topic.
// The returned function unsubscribes h; callers must call it when done (e.g.
// via defer) to avoid leaking handlers.
func (b *EventBridge) Subscribe(topic Topic, name string, h Handler) (unsubscribe func()) {
	b.mu.Lock()
	defer b.mu.Unlock()

	if b.subscribers[topic] == nil {
		b.subscribers[topic] = make(map[string]Handler)
	}
	b.subscribers[topic][name] = h

	return func() {
		b.mu.Lock()
		defer b.mu.Unlock()
		delete(b.subscribers[topic], name)
	}
}

// Publish sends an event to all subscribers on topic. Each handler is called
// in its own goroutine, so Publish returns immediately and no handler can
// block another. Handler errors are forwarded to the onError callback.
func (b *EventBridge) Publish(topic Topic, payload any) {
	b.mu.RLock()
	type entry struct {
		name    string
		handler Handler
	}
	entries := make([]entry, 0, len(b.subscribers[topic]))
	for name, h := range b.subscribers[topic] {
		entries = append(entries, entry{name, h})
	}
	b.mu.RUnlock()

	ev := Event{Topic: topic, Payload: payload}
	for _, e := range entries {
		e := e
		go func() {
			if err := e.handler(ev); err != nil && b.onError != nil {
				b.onError(topic, e.name, err)
			}
		}()
	}
}
