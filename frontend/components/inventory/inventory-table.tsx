import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Inventory } from "@/types/inventory";

interface Props {
  inventories: Inventory[];
}

export function InventoryTable({ inventories }: Props) {
  return (
    <div className="border rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {inventories.map((inventory) => (
            <TableRow key={inventory.ID}>
              <TableCell>{inventory.name}</TableCell>

              <TableCell>{inventory.brand}</TableCell>

              <TableCell>₹{inventory.price}</TableCell>

              <TableCell>{inventory.quantity}</TableCell>

              <TableCell>{inventory.category?.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
