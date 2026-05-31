"use client";

import { useState } from "react";
import { Sheet, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import {
  createExportJob,
  getExportJobStatus,
  getExportDownloadUrl,
} from "@/services/export.service";

export default function ExportButton() {
  const [loading, setLoading] = useState(false);

  const startExport = async () => {
    toast.info("Preparing Excel export...");
    setLoading(true);

    const exportJob = await createExportJob();

    const jobId = exportJob.job_id;

    const interval = setInterval(async () => {
      const status = await getExportJobStatus(jobId);

      if (status.status === "completed") {
        clearInterval(interval);

        window.open(getExportDownloadUrl(jobId), "_blank");
        toast.success("Excel file ready for download");
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <button
      onClick={startExport}
      disabled={loading}
      className="
        flex
          items-center
          bg-primary
          text-white
          px-6
          py-4
          rounded-2xl
          mr-4
      "
    >
      {loading ?
        <LoaderCircle />
      : <Sheet size={20} className="mr-2" />}
      {loading ? "Exporting..." : "Download Inventory"}
    </button>
  );
}
