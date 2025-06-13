import { useCartStore } from "@/modules/checkout/store/use-cart-store";
import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";

export const useCart = (tenantSlug: string) => {
  const addProduct = useCartStore((state) => state.addProduct);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const clearCart = useCartStore((state) => state.clearCart);
  const clearAllCarts = useCartStore((state) => state.clearAllCarts);

  const productIds = useCartStore(
    useShallow((state) => state.tenantCarts[tenantSlug]?.productIds || [])
  );

  const toggleProduct = useCallback(
    (productId: string) => {
      if (productIds.includes(productId)) {
        removeProduct(tenantSlug, productId);
      } else {
        addProduct(tenantSlug, productId);
      }
    },
    [removeProduct, addProduct, tenantSlug, productIds]
  );

  const isProductInCart = useCallback(
    (productId: string) => {
      return productIds.includes(productId);
    },
    [productIds]
  );

  const clearTenantCart = useCallback(() => {
    clearCart(tenantSlug);
  }, [clearCart, tenantSlug]);

  return {
    addProduct: useCallback(
      (productId: string) => addProduct(tenantSlug, productId),
      [addProduct, tenantSlug]
    ),
    removeProduct: useCallback(
      (productId: string) => removeProduct(tenantSlug, productId),
      [removeProduct, tenantSlug]
    ),
    clearCart: clearTenantCart,
    toggleProduct,
    isProductInCart,
    clearAllCarts,
    productIds,
    totalItems: productIds.length,
  };
};
