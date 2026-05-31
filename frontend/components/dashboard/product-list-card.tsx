import { Inventory } from "@/types/inventory";
import { ReactNode } from "react";
import ProductRecord from "../common/product-record";
import CardHeader from "../common/card-header";
import { Astroid } from "lucide-react";

interface Props {
  title: string;
  icon?: ReactNode;
  records: Inventory[];
  display?: "list" | "card";
  showColumns?: string[];
  extraPoints?: ReactNode[];
}

export function ProductListCard({
  title,
  icon,
  records,
  display = "list",
  showColumns = ["name", "price", "quantity"],
  extraPoints = [],
}: Props) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        p-6
        shadow-sm
      "
    >
      {/* header */}
      <CardHeader title={title} icon={icon} />

      {/* extra points */}
      {extraPoints.length > 0 && (
        <div className="mb-8">
          {extraPoints.map((point, index) => (
            <div key={index} className="flex items-center">
              <Astroid size={16} className="mr-2" />
              {point}
            </div>
          ))}
        </div>
      )}

      {/* product list */}
      <div className="overflow-x-auto">
        <div className="max-h-[200px] overflow-y-auto">
          <table className="w-full table-auto">
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
            {/* table body */}
            <tbody>
              {records.map((product, index) => (
                <ProductRecord
                  key={product.ID}
                  index={index}
                  product={product}
                  display={display}
                  showColumns={showColumns}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
