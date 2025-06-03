import { Categories } from "@/components/search-filters/categories";
import { SearchInput } from "@/components/search-filters/search-input";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function SearchFilters({ data }: { data: any }) {
  return (
    <div className="px-4 py-8 border-b w-full">
      <div className="wrapper flex flex-col gap-4 overflow-hidden">
        <SearchInput data={data} />
        <Categories data={data} />
      </div>
    </div>
  );
}
