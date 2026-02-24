package handlers

import (
	"net/http"
	"time"

	"backend/utils"
)

// HealthCheckResponse represents the health check response
type HealthCheckResponse struct {
	Message   string `json:"message"`
	Timestamp string `json:"timestamp"`
}

// HealthCheck handles the health check endpoint
func HealthCheck(w http.ResponseWriter, r *http.Request) {
	response := HealthCheckResponse{
		Message:   "Server is running",
		Timestamp: time.Now().UTC().Format(time.RFC3339),
	}

	utils.SendSuccess(w, response)
}
