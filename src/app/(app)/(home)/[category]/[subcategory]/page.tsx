import { ProductListViews } from "@/modules/products/ui/views/product-list.views";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type SubcategoryPageProps = {
  params: Promise<{
    subcategory: string;
  }>;
  searchParams: Promise<{
    minPrice?: string | undefined;
    maxPrice?: string | undefined;
    tags?: string[] | undefined;
  }>;
};

export default async function SubcategoryPage({
  params,
  searchParams,
}: SubcategoryPageProps) {
  const { subcategory } = await params;
  const { minPrice, maxPrice, tags } = await searchParams;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({
      category: subcategory,
      minPrice,
      maxPrice,
      tags,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListViews category={subcategory} />
    </HydrationBoundary>
  );
}
