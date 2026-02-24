package handlers

import (
	"encoding/json"
	"errors"
	"net/http"

	"backend/db"
	"backend/models"
	"backend/utils"
	"backend/views"

	"gorm.io/gorm"
)

// GetTasks retrieves all tasks from the database, optionally filtered by completion status
func GetTasks(w http.ResponseWriter, r *http.Request) {
	var tasks []models.Task

	query := db.DB

	// Check for optional 'completed' query parameter filter
	completedParam := r.URL.Query().Get("completed")
	if completedParam != "" {
		if completedParam == "true" {
			query = query.Where("completed = ?", true)
		} else if completedParam == "false" {
			query = query.Where("completed = ?", false)
		}
	}

	// Order by created_at descending (newest first)
	if err := query.Order("created_at DESC").Find(&tasks).Error; err != nil {
		utils.SendError(w, "Failed to retrieve tasks", http.StatusInternalServerError)
		return
	}

	utils.SendSuccess(w, tasks)
}

// CreateTask creates a new task with the provided title
func CreateTask(w http.ResponseWriter, r *http.Request) {
	var req views.CreateTaskRequest

	// Parse request body
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.SendError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Validate title is not empty
	if !utils.IsNotEmpty(req.Title) {
		utils.SendError(w, "Title is required", http.StatusBadRequest)
		return
	}

	// Sanitize input
	title := utils.SanitizeString(req.Title)

	// Validate title length
	if !utils.IsValidLength(title, 1, 255) {
		utils.SendError(w, "Title must be between 1 and 255 characters", http.StatusBadRequest)
		return
	}

	// Create new task
	task := models.Task{
		Title:     title,
		Completed: false,
	}

	// Save to database
	if err := db.DB.Create(&task).Error; err != nil {
		utils.SendError(w, "Failed to create task", http.StatusInternalServerError)
		return
	}

	utils.SendSuccessWithStatus(w, task, http.StatusCreated)
}

// GetTaskByID retrieves a single task by its unique identifier
func GetTaskByID(w http.ResponseWriter, r *http.Request) {
	// Extract ID from path parameter using Go 1.22+ ServeMux
	id := r.PathValue("id")

	// Validate ID is not empty
	if id == "" {
		utils.SendError(w, "Task ID is required", http.StatusBadRequest)
		return
	}

	var task models.Task

	// Query database for the task
	if err := db.DB.Where("id = ?", id).First(&task).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			utils.SendError(w, "Task not found", http.StatusNotFound)
			return
		}
		utils.SendError(w, "Failed to retrieve task", http.StatusInternalServerError)
		return
	}

	utils.SendSuccess(w, task)
}

// UpdateTask updates an existing task's title or completion status
func UpdateTask(w http.ResponseWriter, r *http.Request) {
	// Extract ID from path parameter using Go 1.22+ ServeMux
	id := r.PathValue("id")

	// Validate ID is not empty
	if id == "" {
		utils.SendError(w, "Task ID is required", http.StatusBadRequest)
		return
	}

	// Find existing task
	var task models.Task
	if err := db.DB.Where("id = ?", id).First(&task).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			utils.SendError(w, "Task not found", http.StatusNotFound)
			return
		}
		utils.SendError(w, "Failed to retrieve task", http.StatusInternalServerError)
		return
	}

	// Parse request body
	var req views.UpdateTaskRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.SendError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Build updates map for partial update
	updates := make(map[string]interface{})

	// Update title if provided
	if req.Title != nil {
		title := utils.SanitizeString(*req.Title)
		if !utils.IsNotEmpty(title) {
			utils.SendError(w, "Title cannot be empty", http.StatusBadRequest)
			return
		}
		if !utils.IsValidLength(title, 1, 255) {
			utils.SendError(w, "Title must be between 1 and 255 characters", http.StatusBadRequest)
			return
		}
		updates["title"] = title
	}

	// Update completed if provided
	if req.Completed != nil {
		updates["completed"] = *req.Completed
	}

	// Check if there are any updates to apply
	if len(updates) == 0 {
		utils.SendError(w, "No fields to update", http.StatusBadRequest)
		return
	}

	// Apply updates to the task
	if err := db.DB.Model(&task).Updates(updates).Error; err != nil {
		utils.SendError(w, "Failed to update task", http.StatusInternalServerError)
		return
	}

	// Reload the task to get updated values
	if err := db.DB.Where("id = ?", id).First(&task).Error; err != nil {
		utils.SendError(w, "Failed to retrieve updated task", http.StatusInternalServerError)
		return
	}

	utils.SendSuccess(w, task)
}

// DeleteTask permanently deletes a task from the database
func DeleteTask(w http.ResponseWriter, r *http.Request) {
	// Extract ID from path parameter using Go 1.22+ ServeMux
	id := r.PathValue("id")

	// Validate ID is not empty
	if id == "" {
		utils.SendError(w, "Task ID is required", http.StatusBadRequest)
		return
	}

	// Find existing task to ensure it exists
	var task models.Task
	if err := db.DB.Where("id = ?", id).First(&task).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			utils.SendError(w, "Task not found", http.StatusNotFound)
			return
		}
		utils.SendError(w, "Failed to retrieve task", http.StatusInternalServerError)
		return
	}

	// Permanently delete the task using Unscoped to bypass soft delete
	if err := db.DB.Unscoped().Delete(&task).Error; err != nil {
		utils.SendError(w, "Failed to delete task", http.StatusInternalServerError)
		return
	}

	utils.SendSuccess(w, map[string]string{
		"message": "Task deleted successfully",
		"id":      id,
	})
}

// DeleteCompletedTasks permanently deletes all completed tasks from the database
func DeleteCompletedTasks(w http.ResponseWriter, r *http.Request) {
	// Count completed tasks before deletion
	var count int64
	if err := db.DB.Model(&models.Task{}).Where("completed = ?", true).Count(&count).Error; err != nil {
		utils.SendError(w, "Failed to count completed tasks", http.StatusInternalServerError)
		return
	}

	// If no completed tasks found, return early
	if count == 0 {
		utils.SendSuccess(w, map[string]interface{}{
			"message":       "No completed tasks to delete",
			"deleted_count": 0,
		})
		return
	}

	// Permanently delete all completed tasks using Unscoped to bypass soft delete
	result := db.DB.Unscoped().Where("completed = ?", true).Delete(&models.Task{})
	if result.Error != nil {
		utils.SendError(w, "Failed to delete completed tasks", http.StatusInternalServerError)
		return
	}

	utils.SendSuccess(w, map[string]interface{}{
		"message":       "Completed tasks deleted successfully",
		"deleted_count": result.RowsAffected,
	})
}
