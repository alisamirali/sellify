import { ProductListViews } from "@/modules/products/ui/views/product-list.views";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type HomepageProps = {
  searchParams: Promise<{
    minPrice?: string | undefined;
    maxPrice?: string | undefined;
    tags?: string[] | undefined;
  }>;
};

export default async function Homepage({ searchParams }: HomepageProps) {
  const { minPrice, maxPrice, tags } = await searchParams;

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      minPrice,
      maxPrice,
      tags,
      limit: 10,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListViews />
    </HydrationBoundary>
  );
}
