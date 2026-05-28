import { api } from "@/lib/axios";

interface GetInventoriesParams {
  page?: number;
  limit?: number;

  search?: string;

  category_id?: string;

  sort?: string;
  order?: string;
}

export async function getInventories(params: GetInventoriesParams) {
  const response = await api.get("/inventories", {
    params,
  });

  return response.data;
}
