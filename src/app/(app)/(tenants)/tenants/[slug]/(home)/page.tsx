import { ProductListViews } from "@/modules/products/ui/views/product-list.views";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs";

type Props = {
  searchParams: Promise<SearchParams>;
  params: Promise<{ slug: string }>;
};

export default async function TenantPage({ searchParams, params }: Props) {
  const { slug } = await params;
  const { minPrice, maxPrice, tags } = await searchParams;

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      tenantSlug: slug,
      limit: 10,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListViews tenantSlug={slug} narrowView />
    </HydrationBoundary>
  );

  return (
    <div className="flex items-center justify-center h-full w-full">
      <p className="text-2xl font-semibold">Tenant Page</p>
    </div>
  );
}
