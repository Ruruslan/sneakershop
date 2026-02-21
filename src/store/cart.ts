import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
    id: string;
    name: string;
    slug: string;
    brand: string;
    price: number;
    image: string;
    size: number;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string, size: number) => void;
    updateQuantity: (id: string, size: number, quantity: number) => void;
    clearCart: () => void;
    totalItems: () => number;
    totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) =>
                set((state) => {
                    const existing = state.items.find(
                        (i) => i.id === item.id && i.size === item.size
                    );
                    if (existing) {
                        return {
                            items: state.items.map((i) =>
                                i.id === item.id && i.size === item.size
                                    ? { ...i, quantity: i.quantity + item.quantity }
                                    : i
                            ),
                        };
                    }
                    return { items: [...state.items, item] };
                }),

            removeItem: (id, size) =>
                set((state) => ({
                    items: state.items.filter(
                        (i) => !(i.id === id && i.size === size)
                    ),
                })),

            updateQuantity: (id, size, quantity) =>
                set((state) => ({
                    items:
                        quantity <= 0
                            ? state.items.filter(
                                (i) => !(i.id === id && i.size === size)
                            )
                            : state.items.map((i) =>
                                i.id === id && i.size === size ? { ...i, quantity } : i
                            ),
                })),

            clearCart: () => set({ items: [] }),

            totalItems: () =>
                get().items.reduce((sum, item) => sum + item.quantity, 0),

            totalPrice: () =>
                get().items.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                ),
        }),
        {
            name: "snkrs-cart",
        }
    )
);
