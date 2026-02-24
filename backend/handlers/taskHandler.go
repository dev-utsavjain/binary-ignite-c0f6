package handlers

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/google/uuid"
	"gorm.io/gorm"

	"backend/db"
	"backend/models"
	"backend/utils"
	"backend/views"
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

	// Order by creation date descending (newest first)
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

	// Validate required fields
	if req.Title == "" {
		utils.SendError(w, "Title is required", http.StatusBadRequest)
		return
	}

	// Sanitize input
	title := utils.SanitizeString(req.Title)
	if !utils.IsValidLength(title, 1, 255) {
		utils.SendError(w, "Title must be between 1 and 255 characters", http.StatusBadRequest)
		return
	}

	// Create task
	task := models.Task{
		Title:     title,
		Completed: false,
	}

	if err := db.DB.Create(&task).Error; err != nil {
		utils.SendError(w, "Failed to create task", http.StatusInternalServerError)
		return
	}

	utils.SendSuccessWithStatus(w, task, http.StatusCreated)
}

// GetTaskByID retrieves a single task by its unique identifier
func GetTaskByID(w http.ResponseWriter, r *http.Request) {
	// Extract ID from path parameter
	idParam := r.PathValue("id")
	if idParam == "" {
		utils.SendError(w, "Task ID is required", http.StatusBadRequest)
		return
	}

	// Parse UUID
	taskID, err := uuid.Parse(idParam)
	if err != nil {
		utils.SendError(w, "Invalid task ID format", http.StatusBadRequest)
		return
	}

	// Find task by ID
	var task models.Task
	if err := db.DB.Where("id = ?", taskID).First(&task).Error; err != nil {
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
	// Extract ID from path parameter
	idParam := r.PathValue("id")
	if idParam == "" {
		utils.SendError(w, "Task ID is required", http.StatusBadRequest)
		return
	}

	// Parse UUID
	taskID, err := uuid.Parse(idParam)
	if err != nil {
		utils.SendError(w, "Invalid task ID format", http.StatusBadRequest)
		return
	}

	// Find existing task
	var task models.Task
	if err := db.DB.Where("id = ?", taskID).First(&task).Error; err != nil {
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

	// Update fields if provided
	if req.Title != nil {
		title := utils.SanitizeString(*req.Title)
		if !utils.IsValidLength(title, 1, 255) {
			utils.SendError(w, "Title must be between 1 and 255 characters", http.StatusBadRequest)
			return
		}
		task.Title = title
	}

	if req.Completed != nil {
		task.Completed = *req.Completed
	}

	// Save updates
	if err := db.DB.Save(&task).Error; err != nil {
		utils.SendError(w, "Failed to update task", http.StatusInternalServerError)
		return
	}

	utils.SendSuccess(w, task)
}

// DeleteTask permanently deletes a task from the database
func DeleteTask(w http.ResponseWriter, r *http.Request) {
	// Extract ID from path parameter
	idParam := r.PathValue("id")
	if idParam == "" {
		utils.SendError(w, "Task ID is required", http.StatusBadRequest)
		return
	}

	// Parse UUID
	taskID, err := uuid.Parse(idParam)
	if err != nil {
		utils.SendError(w, "Invalid task ID format", http.StatusBadRequest)
		return
	}

	// Check if task exists
	var task models.Task
	if err := db.DB.Where("id = ?", taskID).First(&task).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			utils.SendError(w, "Task not found", http.StatusNotFound)
			return
		}
		utils.SendError(w, "Failed to retrieve task", http.StatusInternalServerError)
		return
	}

	// Permanently delete the task (using Unscoped to bypass soft delete)
	if err := db.DB.Unscoped().Delete(&task).Error; err != nil {
		utils.SendError(w, "Failed to delete task", http.StatusInternalServerError)
		return
	}

	utils.SendSuccess(w, map[string]interface{}{
		"message": "Task deleted successfully",
		"id":      taskID,
	})
}

// DeleteCompletedTasks deletes all completed tasks in bulk
func DeleteCompletedTasks(w http.ResponseWriter, r *http.Request) {
	// Delete all tasks where completed = true
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
