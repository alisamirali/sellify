"use client";

import { generateTenantUrl } from "@/lib/utils";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import { useCheckoutStates } from "@/modules/checkout/hooks/use-checkout-states";
import { CheckoutItem } from "@/modules/checkout/ui/components/checkout-item";
import { CheckoutSidebar } from "@/modules/checkout/ui/components/checkout-sidebar";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InboxIcon, LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

type CheckoutViewProps = {
  tenantSlug: string;
};

export function CheckoutView({ tenantSlug }: CheckoutViewProps) {
  const { productIds, removeProduct, clearCart } = useCart(tenantSlug);
  const { success, setSuccess, cancel, setCancel } = useCheckoutStates();
  const router = useRouter();

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery(
    trpc.checkout.getProducts.queryOptions({
      ids: productIds,
    })
  );

  const purchase = useMutation(
    trpc.checkout.purchase.mutationOptions({
      onMutate: () => {
        setSuccess(false);
        setCancel(false);
      },
      onSuccess: (data) => {
        window.location.href = data.url;
      },
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          router.push("/sign-in");
        }

        toast.error(error.message);
      },
    })
  );

  useEffect(() => {
    if (success) {
      setSuccess(false);
      setCancel(false);

      clearCart();

      queryClient.invalidateQueries(trpc.library.getMany.infiniteQueryFilter());
      router.push("/library");
    }
  }, [
    success,
    clearCart,
    router,
    setSuccess,
    setCancel,
    queryClient,
    trpc.library.getMany,
  ]);

  useEffect(() => {
    if (error?.data?.code === "NOT_FOUND") {
      clearCart();
      toast.warning("Some products were not found. Cart has been cleared.");
    }
  }, [error, clearCart]);

  if (isLoading) {
    return (
      <div className="lg:pt-16 pt-4 px-6 wrapper">
        <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-2 bg-white w-full rounded-lg h-full">
          <LoaderIcon className="text-muted-foreground animate-spin" />
        </div>
      </div>
    );
  }

  if (data?.totalDocs === 0) {
    return (
      <div className="lg:pt-16 pt-4 px-6 wrapper">
        <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-2 bg-white w-full rounded-lg h-full">
          <InboxIcon className="size-12" />
          <p className="text-base font-medium">No products found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pt-16 pt-4 px-6 wrapper">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="border rounded-md overflow-hidden bg-white">
            {data?.docs.map((product, index) => (
              <CheckoutItem
                key={product.id}
                isLast={index === data.docs.length - 1}
                imageUrl={product.image?.url}
                name={product.name}
                productUrl={`${generateTenantUrl(product.tenant.slug)}/products/${product.id}`}
                tenantUrl={generateTenantUrl(product.tenant.slug)}
                tenantName={product.tenant.name}
                price={product.price}
                onRemove={() => removeProduct(product.id)}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <CheckoutSidebar
            total={data?.totalPrice || 0}
            onPurchase={() => purchase.mutate({ tenantSlug, productIds })}
            isCanceled={cancel}
            disabled={purchase.isPending}
          />
        </div>
      </div>
    </div>
  );
}
