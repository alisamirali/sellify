"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProductsFilters } from "@/modules/products/hooks/use-product-filters";
import {
  ProductCard,
  ProductCardSkeleton,
} from "@/modules/products/ui/components/product-card";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { InboxIcon } from "lucide-react";

type ProductListProps = {
  category?: string;
  tenantSlug?: string;
  narrowView?: boolean;
};

export function ProductList({
  category,
  tenantSlug,
  narrowView,
}: ProductListProps) {
  const { minPrice, maxPrice, tags, sort } = useProductsFilters();

  const trpc = useTRPC();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(
      trpc.products.getMany.infiniteQueryOptions(
        {
          category,
          minPrice,
          maxPrice,
          tenantSlug,
          tags,
          sort,
          limit: 10,
        },
        {
          getNextPageParam: (lastPage) =>
            lastPage.docs?.length > 0 ? lastPage.nextPage : undefined,
        }
      )
    );

  if (data.pages?.[0]?.docs?.length === 0) {
    return (
      <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-2 bg-white w-full rounded-lg h-full">
        <InboxIcon className="size-12" />
        <p className="text-base font-medium">No products found</p>
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4",
          narrowView && "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
        )}
      >
        {data?.pages?.length > 0 &&
          data.pages
            .flatMap((page) => page.docs)
            .map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                imageUrl={product.imageUrl?.url || null}
                tenantSlug={product.tenant?.slug || "Unknown"}
                tenantImageUrl={product.tenant?.image?.url || null}
                reviewRating={product.reviewRating}
                reviewCount={product.reviewCount}
                price={product.price}
              />
            ))}
      </div>

      <div className="flex justify-center pt-8">
        {hasNextPage && (
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="font-medium disabled:opacity-50 text-base bg-white"
            variant="elevated"
          >
            Load more
          </Button>
        )}
      </div>
    </>
  );
}

export function ProductListSkeleton({ narrowView }: { narrowView?: boolean }) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4",
        narrowView && "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
      )}
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
