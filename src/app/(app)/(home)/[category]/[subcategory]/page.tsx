import { ProductListViews } from "@/modules/products/ui/views/product-list.views";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const dynamic = "force-dynamic"; // Force dynamic rendering for this page

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

  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      category: subcategory,
      minPrice,
      maxPrice,
      tags,
      limit: 10,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListViews category={subcategory} />
    </HydrationBoundary>
  );
}
