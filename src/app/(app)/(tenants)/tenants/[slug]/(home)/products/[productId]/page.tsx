import { ProductView } from "@/modules/products/ui/views/product-view.views";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { Suspense } from "react";

type Props = {
  params: Promise<{ productId: string; slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { productId, slug } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.tenants.getOne.queryOptions({
      slug,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <div className="lg:pt-16 pt-4 px-6 wrapper min-h-screen">
            <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-2 bg-white w-full rounded-lg h-full">
              <LoaderIcon className="text-muted-foreground animate-spin" />
            </div>
          </div>
        }
      >
        <ProductView productId={productId} tenantSlug={slug} />
      </Suspense>
    </HydrationBoundary>
  );
}
