"use client";

import { Inventory } from "@/types/inventory";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInventory } from "@/services/inventory.service";
import { toast } from "sonner";

type Props = {
  index: number;
  product: Inventory;
  display?: "list" | "card";
  showColumns?: string[];
};

export default function ProductRecord({
  index,
  product,
  display = "list",
  showColumns = ["name", "price", "quantity"],
}: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const columnHandling = (column: string) => {
    switch (column) {
      case "name":
        return (
          <td key={column} className="py-3 px-4">
            {product.name}
          </td>
        );
      case "brand":
        return (
          <td key={column} className="py-3 px-4">
            {product.brand}
          </td>
        );

      case "price":
        return product.offer > 0 && showColumns.includes("offer") ?
            <td key={column} className="py-3 px-4">
              <span className="line-through text-gray-500">
                ₹{product.price.toFixed(2)}
              </span>
              <span className="ml-2 text-green-500 font-bold">
                ₹{(product.price * (1 - product.offer / 100)).toFixed(2)}
              </span>
            </td>
          : <td key={column} className="py-3 px-4">
              ₹{product.price.toFixed(2)}
            </td>;
      case "quantity":
        return (
          <td key={column} className="py-3 px-4">
            {product.quantity}
          </td>
        );
      case "offer":
        return (
          <td key={column} className="py-3 px-4">
            {product.offer ? `${product.offer}% off` : "N/A"}
          </td>
        );
      default:
        return null;
    }
  };

  const onEditInventory = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    // set react-query cache (cache priming) - so edit page pick it from cache rather calling API
    queryClient.setQueryData(["inventory", String(product.ID)], product);

    // redirect to edit page
    router.push(`/inventories/${product.ID}/edit`);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteInventory,

    onSuccess: () => {
      toast.success("Product deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["inventories"],
      });

      router.refresh();
    },

    onError: () => {
      toast.error("Failed to delete product");
    },
  });

  const onDeleteInventory = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    const confirmed = window.confirm(`Delete "${product.name}" ?`);

    if (!confirmed) return;

    deleteMutation.mutate(product.ID);
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors cursor-pointer">
      <td className="py-3 px-4 text-gray-400">{index + 1}</td>
      {showColumns.map((column) => columnHandling(column))}
      <td className="py-3 px-4">
        <button
          onClick={onEditInventory}
          className="bg-yellow-50 p-2 rounded-full cursor-pointer"
        >
          <Pencil size={16} className="text-yellow-500" />
        </button>
        <button
          onClick={onDeleteInventory}
          className="bg-red-50 ml-2 p-2 rounded-full cursor-pointer"
        >
          <Trash size={16} className="text-red-500" />
        </button>
      </td>
    </tr>
  );
}
