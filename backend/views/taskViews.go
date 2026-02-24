package views

import "time"

// CreateTaskRequest represents the request body for creating a task
type CreateTaskRequest struct {
	Title string `json:"title"`
}

// UpdateTaskRequest represents the request body for updating a task
type UpdateTaskRequest struct {
	Title     *string `json:"title,omitempty"`
	Completed *bool   `json:"completed,omitempty"`
}

// TaskResponse represents the response structure for a task
type TaskResponse struct {
	ID        string    `json:"id"`
	Title     string    `json:"title"`
	Completed bool      `json:"completed"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

// TaskListResponse represents a list of tasks
type TaskListResponse struct {
	Tasks []TaskResponse `json:"tasks"`
	Count int            `json:"count"`
}

// DeleteCompletedTasksResponse represents the response for bulk delete operation
type DeleteCompletedTasksResponse struct {
	Message      string `json:"message"`
	DeletedCount int64  `json:"deleted_count"`
}
