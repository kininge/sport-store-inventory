// src/app/inventories/[id]/edit/page.tsx

import EditInventory from "@/components/inventory/edit-inventory";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <EditInventory id={id} />;
}
