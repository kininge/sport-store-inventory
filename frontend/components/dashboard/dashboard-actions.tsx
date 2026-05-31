"use client";

import { Plus, Search, Sheet, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import ExportButton from "./export-button";

export default function DashboardActions() {
  const router = useRouter();

  return (
    <section className="flex justify-end">
      <button
        className="
          flex
          items-center
          bg-primary
          text-white
          px-6
          py-4
          rounded-2xl
          mr-4
        "
        onClick={() => router.push("/inventories/search")}
      >
        <Search size={20} className="mr-2" />
        Search Products
      </button>
      <ExportButton />
      <button
        className="
          flex
          items-center
          bg-primary
          text-white
          px-6
          py-4
          rounded-2xl
        "
        onClick={() => router.push("/inventories/create")}
      >
        <Plus size={20} className="mr-2" />
        Add Product
      </button>
    </section>
  );
}
