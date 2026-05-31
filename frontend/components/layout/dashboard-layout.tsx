import { ReactNode } from "react";

import { AppHeader } from "./app-header";

interface Props {
  children: ReactNode;
}

export function DashboardLayout({ children }: Props) {
  return (
    <main className="flex-1 p-6 bg-background">
      <AppHeader />

      <div className="mt-6">{children}</div>
    </main>
  );
}
