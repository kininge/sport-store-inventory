package handlers

import (
	"backend/internals/database"
	"backend/internals/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// GET ALL INVENTORIES
func GetInventories(c *gin.Context) {
	var inventories []models.Inventory

	result := database.DB.Preload("Category").Find(&inventories)

	// check for errors during the database query
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch inventories",
			"error": result.Error.Error(),
		})

		return
	}

	// response with the list of inventories
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data": inventories,
	})
}


// GET INVENTORY BY ID
func GetInventoryByID(c *gin.Context) {
	id := c.Param("id")

	inventoryID, err := strconv.Atoi(id)

	// check for errors during ID conversion
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid inventory ID",
		})

		return
	}

	var inventory models.Inventory

	result := database.DB.Preload("Category").First(&inventory, inventoryID)

	// check for errors during the database query
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": "Inventory not found",
		})

		return
	}

	// response with the inventory data
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data": inventory,
	})
}

// CREATE INVENTORY
func CreateInventory(c *gin.Context) {
	var inventory models.Inventory

	err := c.ShouldBindJSON(&inventory)

	// check for errors during JSON binding
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request body",
			"error":   err.Error(),
		})

		return
	}

	// CHECK CATEGORY EXISTS
	var category models.Category

	categoryResult := database.DB.First(&category, inventory.CategoryID)

	// check for errors during the database query
	if categoryResult.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid category_id",
		})

		return
	}

	result := database.DB.Create(&inventory)

	// check for errors during the database insert
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to create inventory",
			"error":   result.Error.Error(),
		})

		return
	}

	// response with the created inventory data
	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Inventory created successfully",
		"data": inventory,
	})
}

// UPDATE INVENTORY
func UpdateInventory(c *gin.Context) {
	id := c.Param("id")

	inventoryID, err := strconv.Atoi(id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid inventory ID",
		})

		return
	}

	var inventory models.Inventory

	result := database.DB.First(&inventory, inventoryID)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": "Inventory not found",
		})

		return
	}

	var payload map[string]interface{}

	err = c.ShouldBindJSON(&payload)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request body",
			"error":   err.Error(),
		})

		return
	}

	// If category_id is being updated, check if the new category exists
	updateResult := database.DB.Model(&inventory).Updates(payload)

	if updateResult.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to update inventory",
			"error":   updateResult.Error.Error(),
		})

		return
	}

	// Fetch the updated inventory with category details
	database.DB.Preload("Category").First(&inventory, inventoryID)

	// response with the updated inventory data
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Inventory updated successfully",
		"data":    inventory,
	})
}

// DELETE INVENTORY
func DeleteInventory(c *gin.Context) {
	id := c.Param("id")

	inventoryID, err := strconv.Atoi(id)

	// check for errors during ID conversion
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid inventory ID",
		})

		return
	}

	var inventory models.Inventory

	result := database.DB.First(&inventory, inventoryID)

	// check for errors during the database query
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": "Inventory not found",
		})

		return
	}

	deleteResult := database.DB.Delete(&inventory)

	// check for errors during the database delete
	if deleteResult.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to delete inventory",
			"error":   deleteResult.Error.Error(),
		})

		return
	}

	// response with a success message
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Inventory deleted successfully",
	})
}