package database

import (
	"fmt" // for formatting the connection string
	"log" // for logging errors
	"os"  // for accessing environment variables

	"github.com/joho/godotenv" // for loading environment variables from .env file

	"gorm.io/driver/postgres" // for PostgreSQL driver
	"gorm.io/gorm"            // for GORM ORM
)

// package level singleton variable to hold the database connection
var DB *gorm.DB

func ConnectDB(){
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	
	
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	dbname := os.Getenv("DB_NAME")
	sslmode := os.Getenv("DB_SSLMODE")

	// Create the connection string
	dsn := fmt.Sprintf("host=%s port=%s user=%s dbname=%s sslmode=%s", host, port, user, dbname, sslmode)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database: ", err)
	}

	log.Println("Database connection established successfully")

	DB = db
}