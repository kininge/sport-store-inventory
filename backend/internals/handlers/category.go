package handlers

import (
	"backend/internals/models" // import models package for accessing data models
	"net/http"

	"backend/internals/database" // import database package for accessing the database connection

	"github.com/gin-gonic/gin" // import gin framework for handling HTTP requests
)

func GetCategories(c *gin.Context) {
	var categories  []models.Category

	result := database.DB.Find(&categories)

	// check for errors during the database query
	if(result.Error != nil){
		c.JSON(
			http.StatusInternalServerError, 
			gin.H{
				"status": false,
				"message": "Failed to fetch categories",
				"error": result.Error.Error(),
			},
		)
		return
	}

	// response with the list of categories
	c.JSON(
		http.StatusOK,
		gin.H{
			"status": true,
			"data": categories,
		},
	)
}

func GetCategoryByID(c *gin.Context) {
	var category models.Category

	id := c.Param("id")

	result := database.DB.First(&category, id)

	// check for errors during the database query
	if result.Error != nil {
		c.JSON(
			http.StatusNotFound,
			gin.H{
				"status": false,
				"message": "Category not found",
				"error": result.Error.Error(),
			},
		)
		return
	}

	// response with the category data
	c.JSON(
		http.StatusOK,
		gin.H{
			"status": true,
			"data": category,
		},
	)
}

func CreateCategory(c *gin.Context) {
	var category models.Category

	// bind the JSON payload to the category struct
	err := c.ShouldBindJSON(&category)
	if err != nil {
		c.JSON(
			http.StatusBadRequest,
			gin.H{
				"status": false,
				"message": "Invalid request payload",
				"error": err.Error(),
			},
		)
		return
	}

	result := database.DB.Create(&category)

	// check for errors during the database insert operation
	if result.Error != nil {
		c.JSON(
			http.StatusInternalServerError,
			gin.H{
				"status": false,
				"message": "Failed to create category",
				"error": result.Error.Error(),
			},
		)
		return
	}

	// response with the created category data
	c.JSON(
		http.StatusCreated,
		gin.H{
			"status": true,
			"data": category,
		},
	)
}

func UpdateCategory(c *gin.Context) {
	var category models.Category

	id := c.Param("id")

	// bind the JSON payload to the category struct
	err := c.ShouldBindJSON(&category)
	if err != nil {
		c.JSON(
			http.StatusBadRequest,
			gin.H{
				"status": false,
				"message": "Invalid request payload",
				"error": err.Error(),
			},
		)
		return
	}

	result := database.DB.Model(&category).Where("id = ?", id).Updates(category)

	// check for errors during the database update operation
	if result.Error != nil {
		c.JSON(
			http.StatusInternalServerError,
			gin.H{
				"status": false,
				"message": "Failed to update category",
				"error": result.Error.Error(),
			},
		)
		return
	}

	// response with the updated category data
	c.JSON(
		http.StatusOK,
		gin.H{
			"status": true,
			"data": category,
		},
	)	
}

func DeleteCategory(c *gin.Context) {
	id := c.Param("id")

	result := database.DB.Delete(&models.Category{}, id)

	// check for errors during the database delete operation
	if result.Error != nil {
		c.JSON(
			http.StatusInternalServerError,
			gin.H{
				"status": false,
				"message": "Failed to delete category",
				"error": result.Error.Error(),
			},
		)
		return
	}

	// response with a success message
	c.JSON(
		http.StatusOK,
		gin.H{
			"status": true,
			"message": "Category deleted successfully",
		},
	)	
}