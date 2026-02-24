package utils

import (
	"regexp"
	"strings"
)

// IsValidEmail checks if the given string is a valid email address
func IsValidEmail(email string) bool {
	email = strings.TrimSpace(email)
	if email == "" {
		return false
	}

	// Simple email regex pattern
	pattern := `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
	matched, _ := regexp.MatchString(pattern, email)
	return matched
}

// IsNotEmpty checks if the given string is not empty after trimming
func IsNotEmpty(s string) bool {
	return strings.TrimSpace(s) != ""
}

// IsValidLength checks if the string length is within the specified range
func IsValidLength(s string, min, max int) bool {
	length := len(strings.TrimSpace(s))
	return length >= min && length <= max
}

// SanitizeString trims whitespace and returns the sanitized string
func SanitizeString(s string) string {
	return strings.TrimSpace(s)
}
