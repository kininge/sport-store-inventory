"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import InventoryForm from "./inventory-form";
import { createInventory } from "@/services/inventory.service";
import { toast } from "sonner";

export default function CreateInventory() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createInventory,

    onSuccess: () => {
      toast.success("Product created successfully");

      queryClient.invalidateQueries({
        queryKey: ["inventories"],
      });

      router.push("/");
      router.refresh();
    },

    onError: () => {
      toast.error("Failed to create product");
    },
  });

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm mt-6">
      <h2 className="text-2xl font-bold mb-8">Add Producst</h2>
      <InventoryForm
        loading={mutation.isPending}
        onSubmit={(payload) => mutation.mutate(payload)}
      />
    </div>
  );
}
