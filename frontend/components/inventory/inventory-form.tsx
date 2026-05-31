"use client";

import { useEffect, useMemo, useState } from "react";
import InputField from "../common/input-feild";
import TextareaField from "../common/textarea-feild";
import { Category, Inventory } from "@/types/inventory";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/category.service";
import SelectField from "../common/select-feild";
import ReadOnlyField from "../common/read-only-feild";

export interface InventoryFormData {
  name: string;
  brand: string;
  model: string;
  description: string;

  price: number;
  quantity: number;
  offer: number;

  category_id: number;
}

interface Props {
  inventory?: Inventory;

  loading?: boolean;

  onSubmit: (payload: InventoryFormData) => void;
}

export default function InventoryForm({
  inventory,
  loading = false,
  onSubmit,
}: Props) {
  const { data: categoriesResponse } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const categories = categoriesResponse?.data ?? [];

  const [formData, setFormData] = useState<InventoryFormData>({
    name: "",
    brand: "",
    model: "",
    description: "",

    price: 0,
    quantity: 0,
    offer: 0,

    category_id: 0,
  });

  useEffect(() => {
    if (!inventory) return;

    setFormData({
      name: inventory.name,
      brand: inventory.brand,
      model: inventory.model,
      description: inventory.description,

      price: inventory.price,
      quantity: inventory.quantity,
      offer: inventory.offer,

      category_id: inventory.category_id,
    });
  }, [inventory]);

  const updateField = (
    field: keyof InventoryFormData,
    value: string | number,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const hasChanges = useMemo(() => {
    if (!inventory) return true;

    return (
      JSON.stringify(formData) !==
      JSON.stringify({
        name: inventory.name,
        brand: inventory.brand,
        model: inventory.model,
        description: inventory.description,

        price: inventory.price,
        quantity: inventory.quantity,
        offer: inventory.offer,

        category_id: inventory.category_id,
      })
    );
  }, [formData, inventory]);

  const isValid =
    formData.name.trim() !== "" &&
    formData.brand.trim() !== "" &&
    formData.description.trim() !== "" &&
    formData.category_id > 0 &&
    formData.price >= 0 &&
    formData.quantity >= 0 &&
    formData.offer >= 0 &&
    formData.offer <= 100;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        onSubmit(formData);
      }}
      className="
        grid
        md:grid-cols-2
        gap-6
      "
    >
      <InputField
        label="Product Name"
        value={formData.name}
        onChange={(value) => updateField("name", value)}
      />

      <InputField
        label="Brand"
        value={formData.brand}
        onChange={(value) => updateField("brand", value)}
      />

      <SelectField
        label="Category"
        value={formData.category_id}
        onChange={(value) => updateField("category_id", Number(value))}
        options={[
          {
            label: "Select Category",
            value: 0,
          },

          ...categories.map((category: Category) => ({
            label: category.name,
            value: category.ID,
          })),
        ]}
      />

      <InputField
        label="Model"
        value={formData.model}
        onChange={(value) => updateField("model", value)}
      />

      <InputField
        label="Price"
        type="number"
        min={0}
        value={formData.price}
        onChange={(value) => updateField("price", Number(value))}
      />

      <div>
        <InputField
          label="Quantity"
          type="number"
          min={0}
          value={formData.quantity}
          onChange={(value) => updateField("quantity", Number(value))}
        />
        {formData.quantity <= 10 && (
          <p className="text-sm ml-4 text-orange-500">Low Stock Warning</p>
        )}
      </div>

      <InputField
        label="Offer (%)"
        type="number"
        min={0}
        max={100}
        value={formData.offer}
        onChange={(value) => updateField("offer", Number(value))}
      />

      <ReadOnlyField
        label="Final Price"
        value={`₹${(formData.price * (1 - formData.offer / 100)).toFixed(2)}`}
      />

      <div className="md:col-span-2">
        <TextareaField
          label="Description"
          value={formData.description}
          onChange={(value) => updateField("description", value)}
        />
      </div>

      <div className="md:col-span-2">
        <button
          disabled={!isValid || loading || !hasChanges}
          className="
            bg-primary
            text-white
            px-6
            py-3
            rounded-xl
            disabled:opacity-50
            cursor-pointer
          "
        >
          {loading ? "Saving..." : "Save Product"}
        </button>
      </div>
    </form>
  );
}
