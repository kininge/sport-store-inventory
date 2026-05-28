package routes

import (
	"backend/internals/handlers" // import handlers package

	"github.com/gin-gonic/gin" // gin framework import
)

func RegisterRoutes(router *gin.Engine) {
	// define a route group for API versioning
	apiV1 := router.Group("/api/v1")
	categories := apiV1.Group("/categories")
	inventories := apiV1.Group("/inventories")
	{
		// define a GET route for fetching data
		apiV1.GET("/health", handlers.HealthCheckHandler)
		
		// define routes for categories
		categories.GET("", handlers.GetCategories)
		categories.GET("/:id", handlers.GetCategoryByID)
		categories.POST("", handlers.CreateCategory)
		categories.PUT("/:id", handlers.UpdateCategory)
		categories.DELETE("/:id", handlers.DeleteCategory)

		// define routes for inventories export
		inventories.GET("/export/:id", handlers.GetExportJobStatus)
		inventories.GET("/export/:id/download", handlers.GetExportedFile)
		inventories.POST("/export", handlers.GenerateExportJob)
		// define routes for inventories
		inventories.GET("", handlers.GetInventories)
		inventories.GET("/:id", handlers.GetInventoryByID)
		inventories.POST("", handlers.CreateInventory)
		inventories.PUT("/:id", handlers.UpdateInventory)
		inventories.DELETE("/:id", handlers.DeleteInventory)
		
	}
}