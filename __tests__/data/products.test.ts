/**
 * Product Data & Filtering Tests
 *
 * Tests: data integrity, filtering, search, sorting, edge cases, security
 */
import {
    allProducts,
    getProductBySlug,
    filterProducts,
    brands,
    categories,
} from "@/data/products";

describe("Product Data Integrity", () => {
    it("has at least 8 products", () => {
        expect(allProducts.length).toBeGreaterThanOrEqual(8);
    });

    it("all products have required fields", () => {
        allProducts.forEach((p) => {
            expect(p.id).toBeTruthy();
            expect(p.name).toBeTruthy();
            expect(p.slug).toBeTruthy();
            expect(p.brand).toBeTruthy();
            expect(p.price).toBeGreaterThan(0);
            expect(p.image).toBeTruthy();
            expect(p.description).toBeTruthy();
            expect(p.category).toBeTruthy();
            expect(p.sizes.length).toBeGreaterThan(0);
        });
    });

    it("all product IDs are unique", () => {
        const ids = allProducts.map((p) => p.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it("all product slugs are unique", () => {
        const slugs = allProducts.map((p) => p.slug);
        expect(new Set(slugs).size).toBe(slugs.length);
    });

    it("all prices are positive numbers", () => {
        allProducts.forEach((p) => {
            expect(typeof p.price).toBe("number");
            expect(p.price).toBeGreaterThan(0);
            expect(Number.isFinite(p.price)).toBe(true);
        });
    });

    it("all sizes are valid EU sizes (35-50)", () => {
        allProducts.forEach((p) => {
            p.sizes.forEach((size) => {
                expect(size).toBeGreaterThanOrEqual(35);
                expect(size).toBeLessThanOrEqual(50);
            });
        });
    });

    it("brands data has entries", () => {
        expect(brands.length).toBeGreaterThan(0);
    });

    it("categories data has entries", () => {
        expect(categories.length).toBeGreaterThan(0);
    });
});

describe("getProductBySlug", () => {
    it("returns product for valid slug", () => {
        const product = getProductBySlug("nike-air-max-90");
        expect(product).toBeDefined();
        expect(product!.name).toBe("Nike Air Max 90");
    });

    it("returns undefined for non-existent slug", () => {
        expect(getProductBySlug("nonexistent-product")).toBeUndefined();
    });

    it("returns undefined for empty slug", () => {
        expect(getProductBySlug("")).toBeUndefined();
    });

    // Security: SQL injection-like slug
    it("returns undefined for malicious slug input", () => {
        expect(getProductBySlug("'; DROP TABLE products;--")).toBeUndefined();
        expect(getProductBySlug("<script>alert(1)</script>")).toBeUndefined();
        expect(getProductBySlug("../../../etc/passwd")).toBeUndefined();
    });
});

describe("filterProducts", () => {
    // ─── Brand Filter ──────────────────────────────────────
    describe("brand filter", () => {
        it("filters by brand (case-insensitive)", () => {
            const result = filterProducts({ brand: "nike" });
            expect(result.length).toBeGreaterThan(0);
            result.forEach((p) => expect(p.brand.toLowerCase()).toBe("nike"));
        });

        it("filters by uppercase brand", () => {
            const result = filterProducts({ brand: "Nike" });
            expect(result.length).toBeGreaterThan(0);
        });

        it("returns empty for non-existent brand", () => {
            const result = filterProducts({ brand: "nonexistent" });
            expect(result).toHaveLength(0);
        });
    });

    // ─── Category Filter ──────────────────────────────────
    describe("category filter", () => {
        it("filters by category", () => {
            const result = filterProducts({ category: "lifestyle" });
            expect(result.length).toBeGreaterThan(0);
            result.forEach((p) => expect(p.category).toBe("lifestyle"));
        });

        it("filters by running category", () => {
            const result = filterProducts({ category: "running" });
            expect(result.length).toBeGreaterThan(0);
            result.forEach((p) => expect(p.category).toBe("running"));
        });
    });

    // ─── Price Filter ─────────────────────────────────────
    describe("price filter", () => {
        it("filters by minimum price", () => {
            const result = filterProducts({ minPrice: 15000 });
            result.forEach((p) => expect(p.price).toBeGreaterThanOrEqual(15000));
        });

        it("filters by maximum price", () => {
            const result = filterProducts({ maxPrice: 12000 });
            result.forEach((p) => expect(p.price).toBeLessThanOrEqual(12000));
        });

        it("filters by price range", () => {
            const result = filterProducts({ minPrice: 12000, maxPrice: 16000 });
            result.forEach((p) => {
                expect(p.price).toBeGreaterThanOrEqual(12000);
                expect(p.price).toBeLessThanOrEqual(16000);
            });
        });

        it("returns empty for impossible price range", () => {
            const result = filterProducts({ minPrice: 100000, maxPrice: 100001 });
            expect(result).toHaveLength(0);
        });
    });

    // ─── Search ───────────────────────────────────────────
    describe("search", () => {
        it("searches by product name", () => {
            const result = filterProducts({ search: "Air Max" });
            expect(result.length).toBeGreaterThan(0);
        });

        it("searches by brand name", () => {
            const result = filterProducts({ search: "nike" });
            expect(result.length).toBeGreaterThan(0);
        });

        it("search is case-insensitive", () => {
            const lower = filterProducts({ search: "nike" });
            const upper = filterProducts({ search: "NIKE" });
            expect(lower.length).toBe(upper.length);
        });

        it("returns empty for gibberish search", () => {
            const result = filterProducts({ search: "xyzabc123" });
            expect(result).toHaveLength(0);
        });

        // Security: XSS in search query
        it("handles XSS attempt in search safely", () => {
            const result = filterProducts({
                search: '<script>alert("xss")</script>',
            });
            expect(result).toHaveLength(0); // No match, no crash
        });
    });

    // ─── Sorting ──────────────────────────────────────────
    describe("sorting", () => {
        it("sorts by price ascending", () => {
            const result = filterProducts({ sort: "price-asc" });
            for (let i = 1; i < result.length; i++) {
                expect(result[i].price).toBeGreaterThanOrEqual(result[i - 1].price);
            }
        });

        it("sorts by price descending", () => {
            const result = filterProducts({ sort: "price-desc" });
            for (let i = 1; i < result.length; i++) {
                expect(result[i].price).toBeLessThanOrEqual(result[i - 1].price);
            }
        });

        it("sorts by name ascending", () => {
            const result = filterProducts({ sort: "name-asc" });
            for (let i = 1; i < result.length; i++) {
                expect(result[i].name.localeCompare(result[i - 1].name)).toBeGreaterThanOrEqual(0);
            }
        });
    });

    // ─── Combined Filters ────────────────────────────────
    describe("combined filters", () => {
        it("filters by brand + category", () => {
            const result = filterProducts({
                brand: "nike",
                category: "lifestyle",
            });
            result.forEach((p) => {
                expect(p.brand.toLowerCase()).toBe("nike");
                expect(p.category).toBe("lifestyle");
            });
        });

        it("returns all products with no filters", () => {
            const result = filterProducts({});
            expect(result.length).toBe(allProducts.length);
        });
    });
});
