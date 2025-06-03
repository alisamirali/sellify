/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CategoriesSidebar } from "@/components/search-filters/categories-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ListFilterPlusIcon, SearchIcon } from "lucide-react";
import { useState } from "react";

export function SearchInput({
  data,
  disabled,
}: {
  data: any;
  disabled?: boolean;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar
        data={data}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />

      <div className="w-full flex items-center gap-1 border px-3 rounded-md">
        <SearchIcon className="size-6 text-neutral-500" />
        <Input
          disabled={disabled}
          className="border-none outline-none"
          placeholder="Search products..."
        />
      </div>

      <Button
        variant="elevated"
        className="size-12 shrink-0 flex lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterPlusIcon />
      </Button>
    </div>
  );
}
