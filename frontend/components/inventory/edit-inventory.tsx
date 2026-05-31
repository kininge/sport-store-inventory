"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import InventoryForm from "./inventory-form";
import {
  getInventoryById,
  updateInventory,
  UpdateInventoryRequest,
} from "@/services/inventory.service";
import { toast } from "sonner";

interface Props {
  id: string;
}

export default function EditInventory({ id }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["inventory", id],

    queryFn: async () => {
      const response = await getInventoryById(id);

      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: (payload: UpdateInventoryRequest) =>
      updateInventory(id, payload),

    onSuccess: () => {
      toast.success("Product updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["inventories"],
      });

      router.push("/");
      router.refresh();
    },

    onError: () => {
      toast.error("Failed to update product");
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm mt-6">
      <h2 className="text-2xl font-bold mb-8">Edit Producst</h2>
      <InventoryForm
        inventory={data}
        loading={mutation.isPending}
        onSubmit={(payload) => mutation.mutate(payload)}
      />
    </div>
  );
}
