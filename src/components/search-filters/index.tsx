"use client";

import { Categories } from "@/components/search-filters/categories";
import { SearchInput } from "@/components/search-filters/search-input";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export function SearchFilters() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  return (
    <div
      className="px-4 py-6 border-b w-full"
      style={{ backgroundColor: "#F5F5F5" }}
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
