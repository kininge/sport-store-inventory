"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { getInventories } from "@/services/inventory.service";
import ProductRecord from "../common/product-record";

const showColumns = ["name", "brand", "price", "offer", "quantity"];

export default function InventorySearch() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("created_at");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const LIMIT = 5;

  const { data, isLoading } = useQuery({
    queryKey: ["inventories", search, page, sort, order],

    queryFn: () =>
      getInventories({
        page,
        limit: LIMIT,
        search,
        sort,
        order,
      }),
  });

  const totalItems = data?.pagination?.total || 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / LIMIT));

  return (
    <div className="bg-white rounded-3xl p-6 mt-6 shadow-sm">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-8">Search Product</h2>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            placeholder="Search products..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            className="
              w-full
              border
              rounded-xl
              py-3
              pl-11
              pr-4
              outline-none
              focus:ring-2
              focus:ring-black
            "
          />
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          className="
            border
            rounded-xl
            px-4
            py-3
            min-w-[180px]
          "
        >
          <option value="created_at">Latest</option>

          <option value="price">Price</option>

          <option value="quantity">Quantity</option>

          <option value="name">Name</option>
        </select>

        {/* Order */}
        <button
          onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
          className="
            flex
            items-center
            justify-center
            gap-2
            border
            rounded-xl
            px-4
            py-3
            hover:bg-gray-50
          "
        >
          <ArrowUpDown size={16} />

          {order === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        {search ?
          <p className="text-sm text-gray-600">
            Found <span className="font-semibold">{totalItems}</span> matching
            products
          </p>
        : <p className="text-sm text-gray-600">
            Browse inventory using search, sorting and pagination
          </p>
        }
      </div>

      {/* Loading */}
      {isLoading && <div className="py-12 text-center">Loading...</div>}

      {/* Empty Search State */}
      {!isLoading && !search && totalItems === 0 && (
        <div
          className="
              text-center
              py-16
              border
              rounded-2xl
            "
        >
          <div className="text-5xl mb-4">🔍</div>

          <h3 className="font-semibold text-lg">Search Products</h3>

          <p className="text-gray-500 mt-2">
            Search by name, category, description or brand
          </p>
        </div>
      )}

      {/* No Results */}
      {!isLoading && search && data?.data?.length === 0 && (
        <div
          className="
              text-center
              py-16
              border
              rounded-2xl
            "
        >
          <div className="text-5xl mb-4">😕</div>

          <h3 className="font-semibold text-lg">No products found</h3>

          <p className="text-gray-500 mt-2">
            Try different keywords or change filters
          </p>
        </div>
      )}

      {/* Results Table */}
      {!isLoading && data?.data?.length > 0 && (
        <>
          <table className="w-full">
            {/* table header */}
            <thead className="bg-white sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                {showColumns.map((column) => {
                  if (column === "name") {
                    return (
                      <th key={column} className="py-3 px-4 text-left">
                        Product Name
                      </th>
                    );
                  } else if (column === "brand") {
                    return (
                      <th key={column} className="py-3 px-4 text-left">
                        Brand
                      </th>
                    );
                  } else if (column === "price") {
                    return (
                      <th key={column} className="py-3 px-4 text-left">
                        Price
                      </th>
                    );
                  } else if (column === "quantity") {
                    return (
                      <th key={column} className="py-3 px-4 text-left">
                        Quantity
                      </th>
                    );
                  } else if (column === "offer") {
                    return (
                      <th key={column} className="py-3 px-4 text-left">
                        Offer
                      </th>
                    );
                  }
                })}
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.data.map((inventory: any, index: number) => (
                <ProductRecord
                  key={inventory.ID}
                  index={(page - 1) * LIMIT + index}
                  product={inventory}
                  showColumns={["name", "brand", "price", "offer", "quantity"]}
                />
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div
            className="
                flex
                items-center
                justify-end
                mt-8
              "
          >
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className="
                  flex
                  items-center
                  gap-2
                  border
                  rounded-xl
                  px-4
                  py-2
                  mr-4
                  disabled:opacity-50
                cursor-pointer
                "
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <p className="text-sm text-gray-600 mr-4">
              Page {page} of {totalPages}
            </p>

            <button
              disabled={page >= totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="
                  flex
                  items-center
                  gap-2
                  border
                  rounded-xl
                  px-4
                  py-2
                  disabled:opacity-50
                  cursor-pointer
                "
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
