package handlers

import "net/http"

// RegisterRoutes registers all generated API routes
func RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("GET /api/tasks", GetTasks)
	mux.HandleFunc("POST /api/tasks", CreateTask)
	mux.HandleFunc("GET /api/tasks/{id}", GetTaskByID)
	mux.HandleFunc("PUT /api/tasks/{id}", UpdateTask)
	mux.HandleFunc("DELETE /api/tasks/{id}", DeleteTask)
	mux.HandleFunc("DELETE /api/tasks/completed", DeleteCompletedTasks)
}
