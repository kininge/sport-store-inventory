import { api } from "@/lib/axios";

import {
  DashboardResponse,
  CategoryDistributionResponse,
} from "@/types/dashbaord";

import { Inventory } from "@/types/inventory";

export async function getDashboard(
  lowStockThreshold: number = 10,
): Promise<DashboardResponse> {
  const response = await api.get<DashboardResponse>(
    "/dashboard?lowQuantity=" + lowStockThreshold,
  );

  return response.data;
}

export async function getTopOffers(): Promise<Inventory[]> {
  const response = await api.get("/dashboard/offer-stock");
  return response.data;
}

export async function getLowStockItems(
  lowStockThreshold: number = 10,
): Promise<Inventory[]> {
  const response = await api.get(
    "/dashboard/low-stock?lowQuantity=" + lowStockThreshold,
  );
  return response.data;
}

export async function getCategoryDistribution() {
  const response = await api.get<CategoryDistributionResponse[]>(
    "/dashboard/category-distribution",
  );
  return response.data;
}
