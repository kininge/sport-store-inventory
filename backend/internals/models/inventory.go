package models

import "gorm.io/gorm"

type Inventory struct {
	gorm.Model

	Name         string  `json:"name"`
	Brand        string  `json:"brand"`
	ProductModel string  `json:"model"`
	Description  string  `json:"description"`

	Price    float64 `json:"price"`
	Offer    int     `json:"offer"`
	Quantity int     `json:"quantity"`

	CategoryID uint     `json:"category_id"`
	Category   Category `json:"category"`
}