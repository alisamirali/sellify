/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import { useProductsFilters } from "@/modules/products/hooks/use-product-filters";
import { PriceFilter } from "@/modules/products/ui/components/price-filter";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

type ProductFiltersProps = {
  title: string;
  className?: string;
  children?: React.ReactNode;
};

export function ProductFilter({
  title,
  className,
  children,
}: ProductFiltersProps) {
  const [isOpened, setIsOpened] = useState(false);

  const Icon = isOpened ? ChevronDownIcon : ChevronRightIcon;

  return (
    <div className={cn("p-4 border-b flex flex-col gap-2", className)}>
      <div
        onClick={() => setIsOpened((prev) => !prev)}
        className="flex items-center cursor-pointer justify-between"
      >
        <p className="font-medium">{title}</p>
        <Icon className="size-5" />
      </div>

      {isOpened && children}
    </div>
  );
}

export function ProductFilters() {
  const { minPrice, setMinPrice, maxPrice, setMaxPrice } = useProductsFilters();

  const onChange = (key: "minPrice" | "maxPrice", value: any) => {
    if (key === "minPrice") {
      setMinPrice(value);
    } else if (key === "maxPrice") {
      setMaxPrice(value);
    }
  };

  return (
    <div className="border rounded-md bg-white">
      <div className="p-4 border-b flex items-center justify-between">
        <p className="font-medium">Filters</p>

        <button
          className="underline cursor-pointer hover:text-red-500"
          onClick={() => {}}
          type="button"
        >
          Clear
        </button>
      </div>

      <ProductFilter title="Price" className="border-b-0">
        <PriceFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinPriceChange={(value) => onChange("minPrice", value)}
          onMaxPriceChange={(value) => onChange("maxPrice", value)}
        />
      </ProductFilter>
    </div>
  );
}
