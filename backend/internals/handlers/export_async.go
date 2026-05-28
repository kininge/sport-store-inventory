package handlers

import (
	"backend/internals/workers"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// create export job
func GenerateExportJob(c *gin.Context) {
	// genearte job id
	jobID := uuid.New().String()
	
	// create new export job
	job := &workers.ExportJob{
		ID:       jobID,
		Status:   "queued",
		CreatedAt: time.Now(),
	}

	// store job in memory
	workers.ExportMutex.Lock()
	workers.ExportJobs[jobID] = job
	workers.ExportMutex.Unlock()

	// add job to the export queue
	workers.ExportQueue <- job

	// response 
	c.JSON(http.StatusAccepted, gin.H{
		"success": true,
		"message": "Export job created successfully",
		"job_id": jobID,
		"status": job.Status,
	})
}

// get export job status
func GetExportJobStatus(c *gin.Context){
	jobID := c.Param("id")

	//find job by id
	workers.ExportMutex.Lock()
	job, exists := workers.ExportJobs[jobID]
	workers.ExportMutex.Unlock()

	if !exists {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": "Export job not found",
		})
		return
	}

	// response
	resposne := gin.H{
		"success": true,
		"job_id": job.ID,
		"status": job.Status,
	}

	// add download URL if job is completed
	if job.Status == "completed" {
		resposne["download_url"] = "/api/v1/inventories/export/" + job.ID + "/download"
	}

	// send response
	c.JSON(http.StatusOK, resposne)
}

// download exported file
func GetExportedFile(c *gin.Context) {
	jobID := c.Param("id")

	// find job by id
	workers.ExportMutex.Lock()
	job, exists := workers.ExportJobs[jobID]
	workers.ExportMutex.Unlock()

	if !exists {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": "Export job not found",
		})
		return
	}

	if job.Status != "completed" {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Export job is not completed yet",
		})
		return
	}

	// send file as response
	c.FileAttachment(job.FilePath, "inventories_export.xlsx")
}