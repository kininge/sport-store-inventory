import { api } from "@/lib/axios";

export interface GetInventoriesParams {
  page?: number;
  limit?: number;

  search?: string;

  category_id?: string;

  sort?: string;
  order?: string;
}

export interface CreateInventoryRequest {
  name: string;
  brand: string;
  model: string;
  description: string;

  price: number;
  quantity: number;
  offer: number;

  category_id: number;
}

export interface UpdateInventoryRequest extends Partial<CreateInventoryRequest> {}

export interface UpdateInventoryRequest {
  name?: string;
  brand?: string;
  model?: string;
  description?: string;

  price?: number;
  quantity?: number;
  offer?: number;

  category_id?: number;
}

export async function getInventories(params: GetInventoriesParams) {
  const response = await api.get("/inventories", {
    params,
  });

  return response.data;
}

export async function getInventoryById(id: string | number) {
  const response = await api.get(`/inventories/${id}`);

  return response.data;
}

export async function createInventory(payload: unknown) {
  const response = await api.post("/inventories", payload);

  return response.data;
}

export async function updateInventory(
  id: string | number,
  payload: UpdateInventoryRequest,
) {
  const response = await api.put(`/inventories/${id}`, payload);

  return response.data;
}

export async function deleteInventory(id: string | number) {
  const response = await api.delete(`/inventories/${id}`);

  return response.data;
}
