package utils

import (
	"regexp"
	"strings"
)

// IsValidEmail checks if the provided string is a valid email address
func IsValidEmail(email string) bool {
	emailRegex := regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)
	return emailRegex.MatchString(email)
}

// IsNotEmpty checks if the string is not empty after trimming whitespace
func IsNotEmpty(s string) bool {
	return strings.TrimSpace(s) != ""
}

// IsValidLength checks if the string length is within the specified range
func IsValidLength(s string, min, max int) bool {
	length := len(strings.TrimSpace(s))
	return length >= min && length <= max
}

// SanitizeString trims whitespace from the string
func SanitizeString(s string) string {
	return strings.TrimSpace(s)
}
