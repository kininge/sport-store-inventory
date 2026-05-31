import { FileStack } from "lucide-react";

export function AppHeader() {
  return (
    <header
      className="
        flex
        items-center
        justify-between
        bg-white
        rounded-3xl
        p-4
        shadow-sm
      "
    >
      {/* logo */}
      <div className="flex items-center gap-4">
        <div className="bg-primary text-white p-4 rounded-full">
          <FileStack size={18} />
        </div>
        <h1 className="text-2xl font-bold">Sport Store</h1>
      </div>
    </header>
  );
}
