package middleware

import (
	"log"
	"net/http"
	"runtime/debug"

	"backend/utils"
)

// ErrorHandlingMiddleware catches panics and returns a 500 error
func ErrorHandlingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				log.Printf("Panic recovered: %v\n%s", err, debug.Stack())
				utils.SendError(w, "Internal server error", http.StatusInternalServerError)
			}
		}()

		next.ServeHTTP(w, r)
	})
}
