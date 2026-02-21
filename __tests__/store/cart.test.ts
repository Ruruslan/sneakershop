/**
 * Cart Store Tests
 *
 * Tests: add, remove, update, clear, totals, edge cases, security
 */
import { useCartStore, CartItem } from "@/store/cart";
import { act } from "@testing-library/react";

// Reset store before each test
beforeEach(() => {
    act(() => {
        useCartStore.getState().clearCart();
    });
});

const mockItem: CartItem = {
    id: "1",
    name: "Nike Air Max 90",
    slug: "nike-air-max-90",
    brand: "Nike",
    price: 14990,
    image: "/products/nike-air-max-90.jpg",
    size: 42,
    quantity: 1,
};

const mockItem2: CartItem = {
    id: "2",
    name: "Adidas Ultraboost",
    slug: "adidas-ultraboost",
    brand: "Adidas",
    price: 18990,
    image: "/products/adidas-ultraboost.jpg",
    size: 43,
    quantity: 1,
};

describe("Cart Store", () => {
    // ─── Basic Operations ──────────────────────────────────
    describe("addItem", () => {
        it("adds a new item to empty cart", () => {
            act(() => useCartStore.getState().addItem(mockItem));
            const { items } = useCartStore.getState();
            expect(items).toHaveLength(1);
            expect(items[0]).toEqual(mockItem);
        });

        it("adds multiple different items", () => {
            act(() => {
                useCartStore.getState().addItem(mockItem);
                useCartStore.getState().addItem(mockItem2);
            });
            expect(useCartStore.getState().items).toHaveLength(2);
        });

        it("increments quantity for duplicate item (same id + size)", () => {
            act(() => {
                useCartStore.getState().addItem(mockItem);
                useCartStore.getState().addItem(mockItem);
            });
            const { items } = useCartStore.getState();
            expect(items).toHaveLength(1);
            expect(items[0].quantity).toBe(2);
        });

        it("treats same product with different sizes as separate items", () => {
            const size41 = { ...mockItem, size: 41 };
            const size43 = { ...mockItem, size: 43 };
            act(() => {
                useCartStore.getState().addItem(size41);
                useCartStore.getState().addItem(size43);
            });
            expect(useCartStore.getState().items).toHaveLength(2);
        });
    });

    // ─── Remove ────────────────────────────────────────────
    describe("removeItem", () => {
        it("removes an item by id and size", () => {
            act(() => {
                useCartStore.getState().addItem(mockItem);
                useCartStore.getState().removeItem(mockItem.id, mockItem.size);
            });
            expect(useCartStore.getState().items).toHaveLength(0);
        });

        it("does not remove item with wrong size", () => {
            act(() => {
                useCartStore.getState().addItem(mockItem);
                useCartStore.getState().removeItem(mockItem.id, 99);
            });
            expect(useCartStore.getState().items).toHaveLength(1);
        });

        it("does nothing for non-existent item", () => {
            act(() => {
                useCartStore.getState().addItem(mockItem);
                useCartStore.getState().removeItem("nonexistent", 42);
            });
            expect(useCartStore.getState().items).toHaveLength(1);
        });
    });

    // ─── Update Quantity ───────────────────────────────────
    describe("updateQuantity", () => {
        it("updates quantity for existing item", () => {
            act(() => {
                useCartStore.getState().addItem(mockItem);
                useCartStore.getState().updateQuantity(mockItem.id, mockItem.size, 5);
            });
            expect(useCartStore.getState().items[0].quantity).toBe(5);
        });

        it("removes item when quantity set to 0", () => {
            act(() => {
                useCartStore.getState().addItem(mockItem);
                useCartStore.getState().updateQuantity(mockItem.id, mockItem.size, 0);
            });
            expect(useCartStore.getState().items).toHaveLength(0);
        });

        it("removes item when quantity is negative", () => {
            act(() => {
                useCartStore.getState().addItem(mockItem);
                useCartStore.getState().updateQuantity(mockItem.id, mockItem.size, -1);
            });
            expect(useCartStore.getState().items).toHaveLength(0);
        });
    });

    // ─── Clear ─────────────────────────────────────────────
    describe("clearCart", () => {
        it("removes all items", () => {
            act(() => {
                useCartStore.getState().addItem(mockItem);
                useCartStore.getState().addItem(mockItem2);
                useCartStore.getState().clearCart();
            });
            expect(useCartStore.getState().items).toHaveLength(0);
        });
    });

    // ─── Totals ────────────────────────────────────────────
    describe("totals", () => {
        it("calculates total items correctly", () => {
            act(() => {
                useCartStore.getState().addItem(mockItem);
                useCartStore.getState().addItem(mockItem2);
            });
            expect(useCartStore.getState().totalItems()).toBe(2);
        });

        it("accounts for quantity in totalItems", () => {
            act(() => {
                useCartStore.getState().addItem({ ...mockItem, quantity: 3 });
            });
            expect(useCartStore.getState().totalItems()).toBe(3);
        });

        it("calculates total price correctly", () => {
            act(() => {
                useCartStore.getState().addItem(mockItem); // 14990
                useCartStore.getState().addItem(mockItem2); // 18990
            });
            expect(useCartStore.getState().totalPrice()).toBe(33980);
        });

        it("multiplies price by quantity", () => {
            act(() => {
                useCartStore.getState().addItem({ ...mockItem, quantity: 3 });
            });
            expect(useCartStore.getState().totalPrice()).toBe(14990 * 3);
        });

        it("returns 0 for empty cart", () => {
            expect(useCartStore.getState().totalItems()).toBe(0);
            expect(useCartStore.getState().totalPrice()).toBe(0);
        });
    });

    // ─── Security: XSS in Cart Data ───────────────────────
    describe("security: XSS prevention in stored data", () => {
        it("stores item with script tag in name without executing", () => {
            const xssItem: CartItem = {
                ...mockItem,
                name: '<script>alert("xss")</script>',
            };
            act(() => useCartStore.getState().addItem(xssItem));
            const { items } = useCartStore.getState();
            // Data is stored as-is; React auto-escapes on render
            expect(items[0].name).toBe('<script>alert("xss")</script>');
        });

        it("handles special characters in brand name", () => {
            const item: CartItem = {
                ...mockItem,
                brand: '"><img onerror=alert(1) src=x>',
            };
            act(() => useCartStore.getState().addItem(item));
            expect(useCartStore.getState().items[0].brand).toBe(
                '"><img onerror=alert(1) src=x>'
            );
        });
    });

    // ─── Edge Cases ────────────────────────────────────────
    describe("edge cases", () => {
        it("handles very large quantities", () => {
            act(() => {
                useCartStore
                    .getState()
                    .addItem({ ...mockItem, quantity: 999999 });
            });
            expect(useCartStore.getState().totalItems()).toBe(999999);
        });

        it("handles price of 0", () => {
            act(() => {
                useCartStore.getState().addItem({ ...mockItem, price: 0 });
            });
            expect(useCartStore.getState().totalPrice()).toBe(0);
        });
    });
});
