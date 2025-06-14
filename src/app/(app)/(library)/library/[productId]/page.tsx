import { ProductView } from "@/modules/library/ui/views/product-view.view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type ProductPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.library.getOne.queryOptions({
      productId,
    })
  );

  void queryClient.prefetchQuery(
    trpc.reviews.getOne.queryOptions({
      productId,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductView productId={productId} />
    </HydrationBoundary>
  );
}
