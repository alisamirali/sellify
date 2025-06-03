"use client";

import { SubcategoryMenu } from "@/components/search-filters/sub-category-menu";
import { Button } from "@/components/ui/button";
import { useDropdownPosition } from "@/hooks/use-dropdown-position";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRef, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function CategoryDropdown({
  category,
  isActive,
  isNavigationHovered,
}: {
  category: any;
  isActive: boolean;
  isNavigationHovered: boolean;
}) {
  const [isOpened, setIsOpened] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getDropdownPosition } = useDropdownPosition(dropdownRef);

  const onMouseEnter = () => {
    if (category.subcategories) {
      setIsOpened(true);
    }
  };

  const onMouseLeave = () => setIsOpened(false);

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        <Button
          variant="elevated"
          className={cn(
            "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
            isActive && !isNavigationHovered && "bg-white border-primary",
            isOpened &&
              "bg-white border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[4px]"
          )}
        >
          <Link href={`/${category.slug === "all" ? "" : category.slug}`}>
            {category.name}
          </Link>
        </Button>

        {category.subcategories && category.subcategories.length > 0 && (
          <div
            className={cn(
              "opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2",
              isOpened && "opacity-100"
            )}
          ></div>
        )}
      </div>

      <SubcategoryMenu
        category={category}
        isOpened={isOpened}
        position={getDropdownPosition()}
      />
    </div>
  );
}
