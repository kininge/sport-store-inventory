"use client";

import Link from "next/link";

import { LayoutDashboard, Package, Tags, Download } from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Inventories",
    href: "/inventories",
    icon: Package,
  },
  {
    label: "Categories",
    href: "/categories",
    icon: Tags,
  },
  {
    label: "Exports",
    href: "/exports",
    icon: Download,
  },
];

export function AppSidebar() {
  return (
    <aside
      className="
        w-64
        bg-white
        border-r
        border-border
        flex
        flex-col
      "
    >
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary">Sport Store</h1>
      </div>

      <nav className="px-4 flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className="
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-slate-600
                hover:bg-blue-50
                hover:text-primary
                transition
              "
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
