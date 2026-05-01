package events

import (
	"fmt"

	storage "github.com/billdaws/bookmanager/internal/storage/db"
)

const TopicLibraryCreated Topic = "library.created"

func TopicLibraryBooksChanged(libraryID string) Topic {
	return Topic(fmt.Sprintf("library.%s.books.changed", libraryID))
}

// LibraryBooksChangedPayload is the payload for TopicLibraryBooksChanged events.
type LibraryBooksChangedPayload struct {
	Added   []storage.Book
	Removed []storage.Book
}

const TopicMetadataJobStatus Topic = "metadata.job.status"

// MetadataJobStatusPayload is the payload for TopicMetadataJobStatus events.
type MetadataJobStatusPayload struct {
	// Seq is a monotonically increasing counter stamped by MetadataPoller on
	// each publish. Subscribers use it to discard out-of-order deliveries:
	// because EventBridge dispatches handlers in goroutines, a goroutine
	// carrying an older event can execute after one carrying a newer event,
	// and without Seq the older value would silently overwrite the newer one.
	Seq       uint64
	Running   bool
	Completed int
	Total     int
}
