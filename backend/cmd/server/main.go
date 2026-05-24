package main

import (
	"backend/internals/routes" // import routes package
	"log"                      // log package for logging
	"os"                       // os package for environment variables

	"backend/internals/database" // import database package for connecting to the database

	"github.com/gin-gonic/gin" // gin framework import
	"github.com/joho/godotenv" // godotenv package for loading environment variables
)

func main () {
	// connect Db and migrate models
	database.ConnectDB()
	database.MigrateDB()

	// load environment variables from .env file
	err := godotenv.Load()
	if(err != nil) {
		log.Fatal("Error loading .env file:", err)
	}

	// basic setup for gin router
	router := gin.Default()
	routes.RegisterRoutes(router)
	log.Println("Server is running on port " + os.Getenv("PORT"))

	// start the server
	err = router.Run(":" + os.Getenv("PORT"))

	// error handling
	if err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
