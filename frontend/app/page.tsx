"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";

import { InventoryTable } from "@/components/inventory/inventory-table";

import { getInventories } from "@/services/inventory.service";

export default function HomePage() {
  const [search, setSearch] = useState("");

  // fetch inventories using react-query
  const { data, isLoading } = useQuery({
    queryKey: ["inventories", search],

    queryFn: () =>
      getInventories({
        search,
      }),
  });

  // loading
  if (isLoading) {
    return <main className="p-10">Loading inventories...</main>;
  }

  return (
    <main className="p-10 space-y-6">
      {/* HEADER */}

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Sport Store Inventory</h1>
      </div>

      {/* SEARCH */}

      <div className="max-w-sm">
        <Input
          placeholder="Search inventories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}

      <InventoryTable inventories={data?.data || []} />
    </main>
  );
}
