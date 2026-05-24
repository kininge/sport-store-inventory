package handlers

import (
	"net/http" // net/http package for HTTP status codes

	"github.com/gin-gonic/gin" // gin framework import
)

func HealthCheckHandler(c *gin.Context) {
	// respond with a JSON message indicating the server is healthy
	c.JSON(http.StatusOK, gin.H{
		"status": true,
		"message": "Server is running smoothly",
	})
}	