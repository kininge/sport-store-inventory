package handlers

import (
	"backend/internals/database"
	"backend/internals/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type CategoryDistribution struct {
	Category string `json:"category"`
	Count    int64  `json:"count"`
}

type DashboardResponse struct {
	InventoryHealth struct {
		Score         int   `json:"score"`
		TotalProducts int64 `json:"total_products"`
	} `json:"inventory_health"`

	InventoryValue float64 `json:"inventory_value"`

	StockStatus struct {
		Healthy    int64 `json:"healthy"`
		LowStock   int64 `json:"low_stock"`
		OutOfStock int64 `json:"out_of_stock"`
	} `json:"stock_status"`

}

// get category wise products registred in inventory 
func GetCategoryDistribution(c *gin.Context) {

	var categories []CategoryDistribution

	database.DB.
		Table("inventories").
		Select(`
			categories.name as category,
			count(inventories.id) as count
		`).
		Joins(`
			join categories
			on categories.id = inventories.category_id
		`).
		Group("categories.name").
		Scan(&categories)

	c.JSON(http.StatusOK, categories)
}

// get top 10 products with highest discount offers
func GetTopOffers(c *gin.Context) {

	var offers []models.Inventory

	database.DB.
		Model(&models.Inventory{}).
		Where("offer > 0").
		Order("offer desc").
		Limit(10).
		Find(&offers)

	c.JSON(http.StatusOK, offers)
}

// get top 10 products with lowest stock quantity
func GetLowStockItems(c *gin.Context) {

	var lowStockItems []models.Inventory

	database.DB.
		Model(&models.Inventory{}).
		Order("quantity asc").
		Limit(10).
		Find(&lowStockItems)

	c.JSON(http.StatusOK, lowStockItems)
}

// get overall dashboard metrics for inventory health, value, stock status, etc.
func GetDashboard(c *gin.Context) {
	lowQuantity := c.DefaultQuery("lowQuantity", "10")

	lowQuantityInt, err := strconv.Atoi(lowQuantity)	
	if err != nil || lowQuantityInt < 1 {
		lowQuantityInt = 10
	}

	var response DashboardResponse

	// all items in inventory count
	var totalProducts int64

	database.DB.
		Model(&models.Inventory{}).
		Count(&totalProducts)


	// low stock items count (low stock defined as quantity <= 10)
	var lowStock int64

	database.DB.
		Model(&models.Inventory{}).
		Where("quantity <= ?", lowQuantityInt).
		Count(&lowStock)

	// out of stock items count
	var outOfStock int64

	database.DB.
		Model(&models.Inventory{}).
		Where("quantity = ?", 0).
		Count(&outOfStock)

	healthy := totalProducts - lowStock - outOfStock

	// total inventory value = sum of (price * quantity) for all items
	var inventoryValue float64

	database.DB.
		Model(&models.Inventory{}).
		Select("COALESCE(SUM(price * quantity),0)").
		Scan(&inventoryValue)

	// simple health score calculation based on percentage of healthy items in inventory
	score := 100

	if totalProducts > 0 {
		score = int(
			(float64(healthy) /
				float64(totalProducts)) * 100,
		)
	}

	// populate response struct with calculated values
	response.InventoryHealth.Score = score
	response.InventoryHealth.TotalProducts = totalProducts

	response.InventoryValue = inventoryValue

	response.StockStatus.Healthy = healthy
	response.StockStatus.LowStock = lowStock
	response.StockStatus.OutOfStock = outOfStock

	c.JSON(http.StatusOK, response)
}