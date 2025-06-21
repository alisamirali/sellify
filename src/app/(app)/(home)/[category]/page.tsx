import { ProductListViews } from "@/modules/products/ui/views/product-list.views";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const dynamic = "force-dynamic"; // Force dynamic rendering for this page

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    minPrice?: string | undefined;
    maxPrice?: string | undefined;
    tags?: string[] | undefined;
  }>;
};

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category } = await params;
  const { minPrice, maxPrice, tags } = await searchParams;

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      category,
      minPrice,
      maxPrice,
      tags,
      limit: 10,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListViews category={category} />
    </HydrationBoundary>
  );
}
