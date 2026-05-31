export interface DashboardResponse {
  inventory_health: {
    score: number;
    total_products: number;
  };

  inventory_value: number;

  stock_status: {
    healthy: number;
    low_stock: number;
    out_of_stock: number;
  };
}

export interface CategoryDistributionResponse {
  category: string;
  count: number;
}
