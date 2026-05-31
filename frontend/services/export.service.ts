import { api } from "@/lib/axios";

export async function createExportJob() {
  const response = await api.post("/inventories/export");

  return response.data;
}

export async function getExportJobStatus(jobId: string) {
  const response = await api.get(`/inventories/export/${jobId}`);

  return response.data;
}

export function getExportDownloadUrl(jobId: string) {
  return `http://localhost:8080/api/v1/inventories/export/${jobId}/download`;
}
