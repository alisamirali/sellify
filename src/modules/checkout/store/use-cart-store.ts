import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type TenantCart = {
  productIds: string[];
};

type CartState = {
  tenantCarts: Record<string, TenantCart>;
  addProduct: (tenantSlug: string, productId: string) => void;
  removeProduct: (tenantSlug: string, productId: string) => void;
  clearCart: (tenantSlug: string) => void;
  clearAllCarts: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      tenantCarts: {},

      addProduct: (tenantSlug, productId) => {
        set((state) => ({
          tenantCarts: {
            ...state.tenantCarts,
            [tenantSlug]: {
              productIds: [
                ...(state.tenantCarts[tenantSlug]?.productIds || []),
                productId,
              ],
            },
          },
        }));
      },

      removeProduct: (tenantSlug, productId) => {
        set((state) => {
          const updatedIds = (
            state.tenantCarts[tenantSlug]?.productIds || []
          ).filter((id) => id !== productId);
          return {
            tenantCarts: {
              ...state.tenantCarts,
              [tenantSlug]: {
                productIds: updatedIds,
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
    }),
    {
      name: "sellify-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
