package database

import "backend/internals/models"

func MigrateDB(){
	DB.AutoMigrate(
		&models.Category{},
		&models.Inventory{},
	)
}