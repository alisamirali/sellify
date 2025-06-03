import { CategoryDropdown } from "@/components/search-filters/category-dropdown";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Categories({ data }: { data: any }) {
  return (
    <div className="relative w-full">
      <div className="flex flex-nowrap items-center gap-2 px-1 py-2">
        {data.map((category: any) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={false}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
