package middleware

import "net/http"

// Chain applies multiple middleware to a handler
func Chain(handler http.Handler) http.Handler {
	// Apply middleware in reverse order (last applied runs first)
	handler = LoggingMiddleware(handler)
	handler = ErrorHandlingMiddleware(handler)
	handler = CORSMiddleware(handler)

	return handler
}
