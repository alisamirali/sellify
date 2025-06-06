"use client";

import { DEFAULT_CATEGORY_COLOR } from "@/modules/home/constants";
import { Categories } from "@/modules/home/ui/components/search-filters/categories";
import { SearchInput } from "@/modules/home/ui/components/search-filters/search-input";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export function SearchFilters() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  const params = useParams();
  const categoryParam = params.category as string | undefined;
  const activeCategory = categoryParam || "all";

  const activeCategoryData = data.find(
    (category) => category.slug === activeCategory
  );

  const activeCategoryColor =
    activeCategoryData?.color || DEFAULT_CATEGORY_COLOR;

  return (
    <div
      className="px-4 py-6 border-b w-full"
      style={{ backgroundColor: activeCategoryColor }}
    >
      <div className="wrapper flex flex-col gap-4 overflow-hidden">
        <SearchInput />
        <Categories data={data} />
      </div>
    </div>
  );
}

export function SearchFiltersSkeleton() {
  return (
    <div
      className="px-4 py-8 border-b w-full"
      style={{
        backgroundColor: "#F5F5F5",
      }}
    >
      <div className="wrapper flex flex-col gap-4 overflow-hidden">
        <SearchInput disabled />
        <div className="h-11 " />
      </div>
    </div>
  );
}
