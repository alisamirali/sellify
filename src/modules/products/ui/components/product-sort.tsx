"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProductsFilters } from "@/modules/products/hooks/use-product-filters";

const sortOptions: {
  label: string;
  value: "curated" | "trending" | "hot_and_new";
}[] = [
  { label: "Curated", value: "curated" },
  { label: "Trending", value: "trending" },
  { label: "Hot & New", value: "hot_and_new" },
];

export function ProductSort() {
  const { sort, setSort } = useProductsFilters();

  return (
    <div className="flex items-center gap-2">
      {sortOptions.map(({ label, value }) => (
        <Button
          key={value}
          size="sm"
          variant="secondary"
          onClick={() => setSort(value)}
          className={cn(
            "rounded-full bg-white hover:bg-white",
            sort !== value &&
              "bg-transparent border-transparent hover:border-border hover:bg-transparent"
          )}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
