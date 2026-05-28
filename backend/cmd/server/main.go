package main

import (
	"backend/internals/routes" // import routes package
	"log"                      // log package for logging
	"os"                       // os package for environment variables

	"backend/internals/database" // import database package for connecting to the database

	"backend/internals/workers" // import workers package to start the export worker

	"github.com/gin-contrib/cors" // CROS allow
	"github.com/gin-gonic/gin"    // gin framework import
	"github.com/joho/godotenv"    // godotenv package for loading environment variables
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

	// start the export worker
	workers.StartExportWorker()

	// basic setup for gin router
	router := gin.Default()
	// CORS configuration
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:3000",
		},

		AllowMethods: []string{
			"GET",
			"POST",
			"PUT",
			"DELETE",
			"OPTIONS",
		},

		AllowHeaders: []string{
			"Origin",
			"Content-Type",
			"Accept",
			"Authorization",
		},

		ExposeHeaders: []string{
			"Content-Length",
		},

		AllowCredentials: true,
	}))
	routes.RegisterRoutes(router)
	log.Println("Server is running on port " + os.Getenv("PORT"))

	// start the server
	err = router.Run(":" + os.Getenv("PORT"))

	// error handling
	if err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
