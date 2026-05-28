export interface Category {
  ID: number;
  name: string;
}

export interface Inventory {
  ID: number;

  name: string;
  brand: string;
  model: string;
  description: string;

  price: number;
  offer: number;
  quantity: number;

  category_id: number;

  category: Category;
}

export interface InventoryResponse {
  success: boolean;

  data: Inventory[];

  pagination: {
    total: number;
    page: number;
    limit: number;
  };

  filters: {
    search: string;
    category_id: string;
    sort_feild: string;
    sort_order: string;
  };
}
