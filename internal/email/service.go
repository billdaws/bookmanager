package email

import (
	"context"
	"fmt"
	"os"
	"path/filepath"

	"github.com/resend/resend-go/v2"
)

// ResendSender sends emails via the Resend API.
type ResendSender struct {
	client    *resend.Client
	fromEmail string
}

// NewResendSender returns a ResendSender backed by the Resend API. If apiKey is
// empty, the returned sender's SendBook method returns an error.
func NewResendSender(apiKey, fromEmail string) *ResendSender {
	if apiKey == "" {
		return &ResendSender{}
	}
	return &ResendSender{
		client:    resend.NewClient(apiKey),
		fromEmail: fromEmail,
	}
}

// SendBook sends the book file at bookPath as an email attachment to the
// recipient. bookTitle is used as the email subject.
func (s *ResendSender) SendBook(ctx context.Context, toEmail, toName, bookTitle, bookPath string) error {
	if s.client == nil {
		return fmt.Errorf("email not configured: set BOOKMANAGER_RESEND_API_KEY and BOOKMANAGER_FROM_EMAIL")
	}

	data, err := os.ReadFile(bookPath)
	if err != nil {
		return fmt.Errorf("read book file: %w", err)
	}

	filename := filepath.Base(bookPath)

	params := &resend.SendEmailRequest{
		From:    s.fromEmail,
		To:      []string{toEmail},
		Subject: bookTitle,
		Html:    fmt.Sprintf("<p>Hi %s,</p><p>Please find <em>%s</em> attached.</p>", toName, bookTitle),
		Attachments: []*resend.Attachment{
			{
				Filename: filename,
				Content:  data,
			},
		},
	}

	if _, err := s.client.Emails.SendWithContext(ctx, params); err != nil {
		return fmt.Errorf("send email: %w", err)
	}
	return nil
}
