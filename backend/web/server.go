package web

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"strings"
	"syscall"
	"time"

	"backend/db"
	"backend/handlers"
	"backend/middleware"
)

// StartServer initializes and starts the HTTP server
func StartServer() {
	// Initialize database
	db.InitDB()

	// Create server
	server := createServer()

	// Run server with graceful shutdown
	runServer(server)
}

// createServer creates and configures the HTTP server
func createServer() *http.Server {
	mux := http.NewServeMux()

	// Health check endpoint
	mux.HandleFunc("GET /api/health", handlers.HealthCheck)

	// Register all generated API routes
	handlers.RegisterRoutes(mux)

	// SSR handler (serves dist/ and fallback to index.html)
	mux.HandleFunc("/", spaHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	return &http.Server{
		Addr:         ":" + port,
		Handler:      middleware.Chain(mux),
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}
}

// runServer starts the server and handles graceful shutdown
func runServer(server *http.Server) {
	// Channel to listen for interrupt signals
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)

	// Start server in goroutine
	go func() {
		log.Printf("Server starting on %s", server.Addr)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Server failed to start: %v", err)
		}
	}()

	// Wait for interrupt signal
	<-stop
	log.Println("Shutting down server...")

	// Create context with timeout for shutdown
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Attempt graceful shutdown
	if err := server.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}

	log.Println("Server stopped gracefully")
}

// spaHandler serves static files from dist/ directory and falls back to index.html for SPA routing
func spaHandler(w http.ResponseWriter, r *http.Request) {
	// Skip API routes (should not reach here, but safety check)
	if strings.HasPrefix(r.URL.Path, "/api/") {
		http.NotFound(w, r)
		return
	}

	distPath := "./dist"
	filePath := filepath.Join(distPath, r.URL.Path)

	// Clean the path to prevent directory traversal
	filePath = filepath.Clean(filePath)

	// Check if file exists and is not a directory
	if info, err := os.Stat(filePath); err == nil && !info.IsDir() {
		http.ServeFile(w, r, filePath)
		return
	}

	// Fallback to index.html for SPA client-side routing
	indexPath := filepath.Join(distPath, "index.html")
	if _, err := os.Stat(indexPath); err != nil {
		http.Error(w, "index.html not found", http.StatusNotFound)
		return
	}

	http.ServeFile(w, r, indexPath)
}
