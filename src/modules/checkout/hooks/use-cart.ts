import { useCartStore } from "@/modules/checkout/store/use-cart-store";

export const useCart = (tenantSlug: string) => {
  const cartStore = useCartStore();

  const productIds = cartStore.getCartByTenant(tenantSlug);

  const toggleProduct = (productId: string) => {
    if (productIds.includes(productId)) {
      cartStore.removeProduct(tenantSlug, productId);
    } else {
      cartStore.addProduct(tenantSlug, productId);
    }
  };

  const isProductInCart = (productId: string) => {
    return productIds.includes(productId);
  };

  const clearTenantCart = () => {
    cartStore.clearCart(tenantSlug);
  };

  const clearAllCarts = () => {
    cartStore.clearAllCarts();
  };

  return {
    addProduct: (productId: string) =>
      cartStore.addProduct(tenantSlug, productId),
    removeProduct: (productId: string) =>
      cartStore.removeProduct(tenantSlug, productId),
    clearCart: clearTenantCart,
    toggleProduct,
    isProductInCart,
    clearAllCarts,
    productIds,
    totalItems: productIds.length,
  };
};
