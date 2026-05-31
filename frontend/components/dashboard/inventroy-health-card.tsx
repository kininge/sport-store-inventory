import { DashboardResponse } from "@/types/dashbaord";
import CardHeader from "../common/card-header";
import { Astroid, ShieldBan } from "lucide-react";
import FillBar from "../common/fill-bar";

export default function InventoryHealthCard({
  dashboardData,
  LOW_STOCK_THRESHOLD,
}: {
  dashboardData: DashboardResponse;
  LOW_STOCK_THRESHOLD: number;
}) {
  // You can extract relevant data from the dashboard response to display in this card
  const { inventory_health, inventory_value, stock_status } = dashboardData;

  const lowStockPoint = () => {
    const lowStockCount = stock_status.low_stock;
    const LowStockCountPrint =
      lowStockCount > 0 ?
        <span style={{ color: "#3b82f6" }} className="font-semibold">
          {stock_status.low_stock}
        </span>
      : "No";
    return (
      <p className="text-sm text-gray-500">
        {LowStockCountPrint}
        &nbsp;products has less than&nbsp;
        <span style={{ color: "#3b82f6" }} className="font-semibold">
          {LOW_STOCK_THRESHOLD}
        </span>
        &nbsp;units in stock
      </p>
    );
  };

  const outOfStockPoint = () => {
    const outOfStockCount = stock_status.out_of_stock;
    const OutOfStockCountPrint =
      outOfStockCount > 0 ?
        <span style={{ color: "#3b82f6" }} className="font-semibold">
          {stock_status.out_of_stock}
        </span>
      : "No";
    return (
      <p className="text-sm text-gray-500">
        {OutOfStockCountPrint}
        &nbsp;products are out of stock&nbsp;
      </p>
    );
  };

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
      <CardHeader
        title="Inventory Health"
        icon={<ShieldBan className="text-blue-500" />}
      />

      {/* content */}
      <div>
        {/* Health Status */}
        <div>
          <div className="flex items-end gap-4 mb-4">
            <p className="text-6xl font-bold">{inventory_health.score}%</p>
            <p className="text-sm text-gray-500">
              <span style={{ color: "#3b82f6" }} className="font-semibold">
                {stock_status.healthy}
              </span>
              &nbsp;products out of&nbsp;
              <span style={{ color: "#3b82f6" }} className="font-semibold">
                {inventory_health.total_products}
              </span>
              &nbsp;are has more than&nbsp;
              <span style={{ color: "#3b82f6" }} className="font-semibold">
                10
              </span>
              &nbsp;units in stock
            </p>
          </div>
          <FillBar percentage={inventory_health.score} />
        </div>

        <hr className="border-gray-200 my-6" />

        {/* Low Stock */}
        <div className="flex items-center">
          <Astroid size={16} className="mr-2" />
          {lowStockPoint()}
        </div>
        {/* Out of Stock */}
        <div className="flex items-center">
          <Astroid size={16} className="mr-2" />
          {outOfStockPoint()}
        </div>
      </div>
    </div>
  );
}
