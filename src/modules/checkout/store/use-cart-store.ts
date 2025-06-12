import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type TenantCart = {
  productsIds: string[];
};

type CartState = {
  tenantCarts: Record<string, TenantCart>;
  addProduct: (tenantSlug: string, productId: string) => void;
  removeProduct: (tenantSlug: string, productId: string) => void;
  clearCart: (tenantSlug: string) => void;
  clearAllCarts: () => void;
  getCartByTenant: (tenantSlug: string) => string[];
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      tenantCarts: {},

      addProduct: (tenantSlug, productId) => {
        set((state) => ({
          tenantCarts: {
            ...state.tenantCarts,
            [tenantSlug]: {
              productsIds: [
                ...(state.tenantCarts[tenantSlug]?.productsIds || []),
                productId,
              ],
            },
          },
        }));
      },

      removeProduct: (tenantSlug, productId) => {
        set((state) => {
          const updatedIds = (
            state.tenantCarts[tenantSlug]?.productsIds || []
          ).filter((id) => id !== productId);
          return {
            tenantCarts: {
              ...state.tenantCarts,
              [tenantSlug]: {
                productsIds: updatedIds,
              },
            },
          };
        });
      },

      clearCart: (tenantSlug) => {
        set((state) => {
          const newTenantCarts = { ...state.tenantCarts };
          delete newTenantCarts[tenantSlug];
          return { tenantCarts: newTenantCarts };
        });
      },

      clearAllCarts: () => {
        set(() => ({ tenantCarts: {} }));
      },

      getCartByTenant: (tenantSlug) => {
        return get().tenantCarts[tenantSlug]?.productsIds || [];
      },
    }),
    {
      name: "sellify-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
