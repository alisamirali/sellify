import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export function SearchInput({ disabled }: { disabled: boolean }) {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="w-full flex items-center gap-1 border px-3 py-2 rounded-md">
        <SearchIcon className="size-6 text-neutral-500" />
        <Input
          disabled={disabled}
          className="border-none outline-none"
          placeholder="Search products..."
        />
      </div>
    </div>
  );
}
