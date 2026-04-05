package main

import "fmt"

const TopicLibraryCreated Topic = "library.created"

func topicLibraryBooksChanged(libraryID string) Topic {
	return Topic(fmt.Sprintf("library.%s.books.changed", libraryID))
}
