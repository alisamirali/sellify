"use client";

import { useProductsFilters } from "@/modules/products/hooks/use-product-filters";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

type ProductListProps = {
  category?: string;
};

export function ProductList({ category }: ProductListProps) {
  const { minPrice, maxPrice, tags, sort } = useProductsFilters();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({
      category,
      minPrice,
      maxPrice,
      tags,
      sort,
    })
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {data?.docs?.length > 0 ? (
          data.docs.map((product) => (
            <div key={product.id} className="border rounded-md bg-white p-4">
              <h2 className="text-xl font-medium">{product.name}</h2>
              <p>${product?.price}</p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center p-8">
            <p>No products found with the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function ProductListSkeleton() {
  return <div>Loading...</div>;
}
