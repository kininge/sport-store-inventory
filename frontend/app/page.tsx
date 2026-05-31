import { BatteryLow, Percent } from "lucide-react";
import {
  getDashboard,
  getTopOffers,
  getLowStockItems,
  getCategoryDistribution,
} from "@/services/dashboard.service";
import { ProductListCard } from "@/components/dashboard/product-list-card";
import InventoryHealthCard from "@/components/dashboard/inventroy-health-card";
import CategoryChartCard from "@/components/dashboard/category-chart-card";
import DashboardActions from "@/components/dashboard/dashboard-actions";

const LOW_STOCK_THRESHOLD = 10;

export default async function HomePage() {
  const dashboard = await getDashboard();
  const categoryDistribution = await getCategoryDistribution();
  const topOffers = await getTopOffers();
  const lowStockItems = await getLowStockItems();

  return (
    <div className="my-8">
      {/* home page action bar */}
      <DashboardActions />

      {/* small dashboard cards */}
      <section
        className="
            flex
            flex-wrap
            gap-6
            mt-8
          "
      >
        <InventoryHealthCard
          dashboardData={dashboard}
          LOW_STOCK_THRESHOLD={LOW_STOCK_THRESHOLD}
        />
        <CategoryChartCard
          categoryDistribution={categoryDistribution}
          LOW_STOCK_THRESHOLD={LOW_STOCK_THRESHOLD}
        />
      </section>
      {/* large dashboard cards */}
      <section
        className="
            grid
            md:grid-cols-2
            gap-6
            mt-6
          "
      >
        {/* Low Stock Products */}
        <ProductListCard
          title="Low Stock Products"
          icon={<BatteryLow className="text-blue-500" />}
          records={lowStockItems}
        />

        {/* Top Offers */}
        <ProductListCard
          title="Top Offers"
          icon={<Percent className="text-blue-500" />}
          showColumns={["name", "price", "offer"]}
          records={topOffers}
        />
      </section>
    </div>
  );
}
