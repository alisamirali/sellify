import { ProductListViews } from "@/modules/products/ui/views/product-list.views";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

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
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({
      category,
      minPrice,
      maxPrice,
      tags,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListViews category={category} />
    </HydrationBoundary>
  );
}
