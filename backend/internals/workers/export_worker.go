package workers

import (
	"backend/internals/database"
	"backend/internals/models"
	"fmt"
	"log"
	"os"
	"sync"
	"time"

	"github.com/xuri/excelize/v2"
)

// EXPORT job struct
type ExportJob struct {
	ID       string
	Status   string
	FilePath string
	CreatedAt time.Time
}

// job storage 
var (
	ExportJobs = make(map[string]*ExportJob)

	ExportMutex sync.Mutex
)

// job channel
var ExportQueue = make(chan *ExportJob, 100)

// function to start the export worker
func StartExportWorker() {
	log.Println("EXPORT WORKER STARTED")
	go func() {
		for job := range ExportQueue {
			log.Printf("Processing export job: %s", job.ID)
			ProcessExportJob(job)
		}
	}()
}

// function to process the export job
func ProcessExportJob(job *ExportJob) {
	log.Println("EXPORT WORKER START PROCESSING JOB: ", job.ID)

	// update job status to "processing"
	ExportMutex.Lock()
	job.Status = "processing"
	ExportMutex.Unlock()

	// fetch inventory data and generate Excel file
	var inventories []models.Inventory

	result := database.DB.Preload("Category").Find(&inventories)
	
	if result.Error != nil {
		log.Printf("Failed to fetch inventories for export job %s: %s", job.ID, result.Error.Error())

		ExportMutex.Lock()
		job.Status = "failed"
		ExportMutex.Unlock()

		return
	}

	// Create a new Excel file
	file := excelize.NewFile()
	log.Println("FILE CREATED: ", file)
	
	// create a new sheet
	sheetName := "Inventories"
	file.SetSheetName("Sheet1", sheetName)
	log.Println("SHEET CREATED: ", sheetName)

	// Set header row
	headers := []string{
		"ID",
		"Name",
		"Brand",
		"Product Model",
		"Description",
		"Quantity",
		"Price",
		"Offer",
		"Category",
	}
	for index, header := range headers {
		cell := fmt.Sprintf("%c1", 'A'+index)
		file.SetCellValue(sheetName, cell, header)
	}
	log.Println("HEADERS SET: ", headers)

	// Fill data rows
	for index, inventory := range inventories {
		row := index + 2 // data starts from row 2

		file.SetCellValue(sheetName, fmt.Sprintf("A%d", row), inventory.ID)
		file.SetCellValue(sheetName, fmt.Sprintf("B%d", row), inventory.Name)
		file.SetCellValue(sheetName, fmt.Sprintf("C%d", row), inventory.Brand)
		file.SetCellValue(sheetName, fmt.Sprintf("D%d", row), inventory.ProductModel)
		file.SetCellValue(sheetName, fmt.Sprintf("E%d", row), inventory.Description)
		file.SetCellValue(sheetName, fmt.Sprintf("F%d", row), inventory.Quantity)
		file.SetCellValue(sheetName, fmt.Sprintf("G%d", row), inventory.Price)
		file.SetCellValue(sheetName, fmt.Sprintf("H%d", row), inventory.Offer)
		file.SetCellValue(sheetName, fmt.Sprintf("I%d", row), inventory.Category.Name)
	}
	log.Println("DATA ROWS FILLED: ", len(inventories))
	// create export directory if it doesn't exist
	os.MkdirAll("exports", os.ModePerm)

	// save the file
	filePath := fmt.Sprintf("exports/inventories_%s.xlsx", job.ID)
	err := file.SaveAs(filePath)
	if err != nil {
		log.Printf("Failed to save Excel file for export job %s: %s", job.ID, err.Error())

		ExportMutex.Lock()
		job.Status = "failed"
		ExportMutex.Unlock()

		return
	}
	log.Println("FILE SAVED: ", filePath)
	// update job status to "completed" and set file path
	ExportMutex.Lock()
	job.Status = "completed"
	job.FilePath = filePath
	ExportMutex.Unlock()

	log.Printf("Export job %s completed successfully, file saved at %s", job.ID, filePath)
}