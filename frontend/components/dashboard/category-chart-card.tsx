import { ChartColumnStacked } from "lucide-react";
import CardHeader from "../common/card-header";
import BarChart from "../common/bar-chart";
import { CategoryDistributionResponse } from "@/types/dashbaord";

export default function CategoryChartCard(
  // categoryDistribution: CategoryDistributionResponse,
  {
    categoryDistribution,
    LOW_STOCK_THRESHOLD,
  }: {
    categoryDistribution: CategoryDistributionResponse[];
    LOW_STOCK_THRESHOLD: number;
  },
) {
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
        title="Products by Category"
        icon={<ChartColumnStacked className="text-blue-500" />}
      />
      {/* category chart */}
      <BarChart
        data={categoryDistribution}
        LOW_STOCK_THRESHOLD={LOW_STOCK_THRESHOLD}
      />
    </div>
  );
}
