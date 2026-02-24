package middleware

import "net/http"

// Chain applies all middleware to the handler in order
func Chain(handler http.Handler) http.Handler {
	// Apply middleware in reverse order (last one wraps first)
	handler = LoggingMiddleware(handler)
	handler = ErrorHandlingMiddleware(handler)
	handler = CORSMiddleware(handler)

	return handler
}
