package main

import (
	"errors"
	"fmt"
	"sync"
	"testing"
	"time"
)

func TestEventBridge_BasicPubSub(t *testing.T) {
	t.Parallel()
	b := NewEventBridge(nil)

	var wg sync.WaitGroup
	wg.Add(1)
	var received Event

	b.Subscribe("test.topic", "test-subscriber", func(e Event) error {
		received = e
		wg.Done()
		return nil
	})

	b.Publish("test.topic", "hello")
	wg.Wait()

	if received.Topic != "test.topic" {
		t.Errorf("topic = %q, want test.topic", received.Topic)
	}
	if received.Payload.(string) != "hello" {
		t.Errorf("payload = %v, want hello", received.Payload)
	}
}

// TestEventBridge_FanOut verifies all subscribers on a topic receive every event.
func TestEventBridge_FanOut(t *testing.T) {
	t.Parallel()
	b := NewEventBridge(nil)

	const n = 3
	var mu sync.Mutex
	var wg sync.WaitGroup
	wg.Add(n)
	counts := make(map[string]int)

	for i := range n {
		name := fmt.Sprintf("subscriber-%d", i)
		b.Subscribe("topic", name, func(e Event) error {
			mu.Lock()
			counts[name]++
			mu.Unlock()
			wg.Done()
			return nil
		})
	}

	b.Publish("topic", nil)
	wg.Wait()

	for i := range n {
		name := fmt.Sprintf("subscriber-%d", i)
		if counts[name] != 1 {
			t.Errorf("%s: got %d events, want 1", name, counts[name])
		}
	}
}

// TestEventBridge_SlowHandlerDoesNotBlockOthers verifies that a slow subscriber
// cannot stall fan-out to other subscribers.
func TestEventBridge_SlowHandlerDoesNotBlockOthers(t *testing.T) {
	t.Parallel()
	b := NewEventBridge(nil)

	fastReceived := make(chan struct{})

	b.Subscribe("topic", "slow-subscriber", func(e Event) error {
		time.Sleep(500 * time.Millisecond)
		return nil
	})
	b.Subscribe("topic", "fast-subscriber", func(e Event) error {
		close(fastReceived)
		return nil
	})

	b.Publish("topic", nil)

	select {
	case <-fastReceived:
	case <-time.After(200 * time.Millisecond):
		t.Error("fast handler was blocked by slow handler")
	}
}

// TestEventBridge_Unsubscribe verifies the handler is not called after unsubscribing.
func TestEventBridge_Unsubscribe(t *testing.T) {
	t.Parallel()
	b := NewEventBridge(nil)

	called := make(chan struct{}, 1)
	unsub := b.Subscribe("topic", "test-subscriber", func(e Event) error {
		called <- struct{}{}
		return nil
	})

	unsub()
	b.Publish("topic", nil)

	select {
	case <-called:
		t.Error("handler called after unsubscribe")
	case <-time.After(50 * time.Millisecond):
	}
}

// TestEventBridge_TopicIsolation verifies publishing to one topic does not
// trigger handlers registered on a different topic.
func TestEventBridge_TopicIsolation(t *testing.T) {
	t.Parallel()
	b := NewEventBridge(nil)

	wrongCalled := make(chan struct{}, 1)
	b.Subscribe("topic.a", "test-subscriber", func(e Event) error {
		wrongCalled <- struct{}{}
		return nil
	})

	b.Publish("topic.b", nil)

	select {
	case <-wrongCalled:
		t.Error("handler for topic.a was triggered by publish to topic.b")
	case <-time.After(50 * time.Millisecond):
	}
}

// TestEventBridge_HandlerError verifies that a handler error is forwarded to
// the onError callback with the correct topic and subscriber name.
func TestEventBridge_HandlerError(t *testing.T) {
	t.Parallel()

	type handlerErr struct {
		topic Topic
		name  string
		err   error
	}
	errs := make(chan handlerErr, 1)

	b := NewEventBridge(func(topic Topic, name string, err error) {
		errs <- handlerErr{topic, name, err}
	})

	sentinel := errors.New("handler failed")
	b.Subscribe("topic", "failing-subscriber", func(e Event) error {
		return sentinel
	})

	b.Publish("topic", nil)

	select {
	case got := <-errs:
		if got.topic != "topic" {
			t.Errorf("topic = %q, want topic", got.topic)
		}
		if got.name != "failing-subscriber" {
			t.Errorf("name = %q, want failing-subscriber", got.name)
		}
		if !errors.Is(got.err, sentinel) {
			t.Errorf("err = %v, want sentinel error", got.err)
		}
	case <-time.After(time.Second):
		t.Error("timeout waiting for error callback")
	}
}

// TestEventBridge_ConcurrentPublish verifies concurrent publishes do not race.
// Run with -race.
func TestEventBridge_ConcurrentPublish(t *testing.T) {
	t.Parallel()
	b := NewEventBridge(nil)

	received := make(chan struct{}, 100)
	b.Subscribe("topic", "test-subscriber", func(e Event) error {
		received <- struct{}{}
		return nil
	})

	const n = 10
	var wg sync.WaitGroup
	for range n {
		wg.Add(1)
		go func() {
			defer wg.Done()
			b.Publish("topic", nil)
		}()
	}
	wg.Wait()

	count := 0
	deadline := time.After(time.Second)
	for {
		select {
		case <-received:
			count++
			if count == n {
				return
			}
		case <-deadline:
			t.Errorf("got %d events, want %d", count, n)
			return
		}
	}
}

// TestEventBridge_ConcurrentSubscribeUnsubscribe verifies that subscribe and
// unsubscribe concurrent with publish do not race.
func TestEventBridge_ConcurrentSubscribeUnsubscribe(t *testing.T) {
	t.Parallel()
	b := NewEventBridge(nil)

	var wg sync.WaitGroup
	for i := range 20 {
		wg.Add(1)
		i := i
		go func() {
			defer wg.Done()
			name := fmt.Sprintf("subscriber-%d", i)
			unsub := b.Subscribe("topic", name, func(e Event) error { return nil })
			b.Publish("topic", nil)
			unsub()
		}()
	}
	wg.Wait()
}
