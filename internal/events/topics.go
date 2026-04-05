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
