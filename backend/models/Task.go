package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Task represents a task in the database
type Task struct {
	ID        uuid.UUID      `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	Title     string         `gorm:"type:varchar(255);not null" json:"title"`
	Completed bool           `gorm:"default:false" json:"completed"`
	CreatedAt time.Time      `gorm:"autoCreateTime" json:"createdAt"`
	UpdatedAt time.Time      `gorm:"autoUpdateTime" json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

// TableName returns the table name for the Task model
func (Task) TableName() string {
	return "tasks"
}
