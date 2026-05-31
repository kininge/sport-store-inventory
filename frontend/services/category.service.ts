import { api } from "@/lib/axios";

export async function getCategories() {
  const response = await api.get("/categories");

  return response.data;
}

export async function getCategoryById(id: string | number) {
  const response = await api.get(`/categories/${id}`);

  return response.data;
}

export async function createCategory(payload: { name: string }) {
  const response = await api.post("/categories", payload);

  return response.data;
}

export async function updateCategory(
  id: string | number,
  payload: {
    name: string;
  },
) {
  const response = await api.put(`/categories/${id}`, payload);

  return response.data;
}

export async function deleteCategory(id: string | number) {
  const response = await api.delete(`/categories/${id}`);

  return response.data;
}
