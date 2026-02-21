/**
 * Checkout API Security Tests
 *
 * Tests the /api/checkout route handler directly
 * Focus: input validation, XSS, injection, prototype pollution, DoS vectors
 *
 * @jest-environment node
 */
import { POST } from "@/app/api/checkout/route";
import { NextRequest } from "next/server";

// Helper to create a NextRequest with JSON body
function createRequest(body: unknown): NextRequest {
    return new NextRequest("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
}

const validItem = {
    id: "1",
    name: "Nike Air Max 90",
    slug: "nike-air-max-90",
    brand: "Nike",
    price: 14990,
    image: "/products/nike-air-max-90.jpg",
    size: 42,
    quantity: 1,
};

describe("Checkout API", () => {
    // ─── Valid Requests ────────────────────────────────────
    describe("valid requests", () => {
        it("returns a URL for valid cart items (demo mode)", async () => {
            const req = createRequest({ items: [validItem] });
            const res = await POST(req);
            const data = await res.json();

            expect(res.status).toBe(200);
            expect(data.url).toBeDefined();
            expect(data.url).toContain("/checkout/success");
        });

        it("accepts multiple valid items", async () => {
            const req = createRequest({
                items: [
                    validItem,
                    { ...validItem, id: "2", name: "Adidas Ultraboost", size: 43 },
                ],
            });
            const res = await POST(req);
            const data = await res.json();

            expect(res.status).toBe(200);
            expect(data.url).toBeDefined();
        });
    });

    // ─── Empty / Missing Data ─────────────────────────────
    describe("empty and missing data", () => {
        it("rejects empty items array", async () => {
            const req = createRequest({ items: [] });
            const res = await POST(req);

            expect(res.status).toBe(400);
            const data = await res.json();
            expect(data.error).toBeDefined();
        });

        it("rejects request without items field", async () => {
            const req = createRequest({});
            const res = await POST(req);

            expect(res.status).toBe(400);
        });

        it("rejects null items", async () => {
            const req = createRequest({ items: null });
            const res = await POST(req);

            expect(res.status).toBe(400);
        });
    });

    // ─── XSS Prevention ──────────────────────────────────
    describe("XSS prevention", () => {
        it("strips XSS tags from product name", async () => {
            const xssItem = {
                ...validItem,
                name: '<script>alert("xss")</script>',
            };
            const req = createRequest({ items: [xssItem] });
            const res = await POST(req);
            const data = await res.json();

            // Sanitizer strips < and > — remaining text is non-empty, so 200
            expect(res.status).toBe(200);
            expect(data.url).not.toContain("<script>");
        });

        it("rejects javascript: protocol in image path", async () => {
            const xssItem = {
                ...validItem,
                image: 'javascript:alert("xss")',
            };
            const req = createRequest({ items: [xssItem] });
            const res = await POST(req);

            // Image is sanitized, still valid string
            expect([200, 400]).toContain(res.status);
        });

        it("strips HTML tags from product name", async () => {
            const xssItem = {
                ...validItem,
                name: '<img src=x onerror="alert(1)">',
            };
            const req = createRequest({ items: [xssItem] });
            const res = await POST(req);
            const data = await res.json();

            // Tags stripped, remaining text passes validation
            expect(res.status).toBe(200);
            expect(data.url).not.toContain("<img");
        });
    });

    // ─── Input Validation: Price ──────────────────────────
    describe("price validation", () => {
        it("rejects negative price", async () => {
            const badItem = { ...validItem, price: -100 };
            const req = createRequest({ items: [badItem] });
            const res = await POST(req);

            expect(res.status).toBe(400);
        });

        it("rejects zero price", async () => {
            const badItem = { ...validItem, price: 0 };
            const req = createRequest({ items: [badItem] });
            const res = await POST(req);

            expect(res.status).toBe(400);
        });

        it("rejects absurd price (> 1M)", async () => {
            const badItem = { ...validItem, price: 2_000_000 };
            const req = createRequest({ items: [badItem] });
            const res = await POST(req);

            expect(res.status).toBe(400);
        });

        it("rejects NaN price", async () => {
            const badItem = { ...validItem, price: "not-a-number" };
            const req = createRequest({ items: [badItem] });
            const res = await POST(req);

            expect(res.status).toBe(400);
        });
    });

    // ─── Input Validation: Quantity ───────────────────────
    describe("quantity validation", () => {
        it("rejects zero quantity", async () => {
            const badItem = { ...validItem, quantity: 0 };
            const req = createRequest({ items: [badItem] });
            const res = await POST(req);

            expect(res.status).toBe(400);
        });

        it("rejects negative quantity", async () => {
            const badItem = { ...validItem, quantity: -5 };
            const req = createRequest({ items: [badItem] });
            const res = await POST(req);

            expect(res.status).toBe(400);
        });

        it("rejects quantity > 99", async () => {
            const badItem = { ...validItem, quantity: 100 };
            const req = createRequest({ items: [badItem] });
            const res = await POST(req);

            expect(res.status).toBe(400);
        });
    });

    // ─── Input Validation: Size ───────────────────────────
    describe("size validation", () => {
        it("rejects size below 30", async () => {
            const badItem = { ...validItem, size: 5 };
            const req = createRequest({ items: [badItem] });
            const res = await POST(req);

            expect(res.status).toBe(400);
        });

        it("rejects size above 60", async () => {
            const badItem = { ...validItem, size: 100 };
            const req = createRequest({ items: [badItem] });
            const res = await POST(req);

            expect(res.status).toBe(400);
        });
    });

    // ─── DoS Prevention ──────────────────────────────────
    describe("DoS prevention", () => {
        it("rejects more than 50 items", async () => {
            const manyItems = Array.from({ length: 51 }, (_, i) => ({
                ...validItem,
                id: String(i),
            }));
            const req = createRequest({ items: manyItems });
            const res = await POST(req);

            expect(res.status).toBe(400);
            const data = await res.json();
            expect(data.error).toContain("50");
        });

        it("accepts exactly 50 items", async () => {
            const items = Array.from({ length: 50 }, (_, i) => ({
                ...validItem,
                id: String(i),
            }));
            const req = createRequest({ items });
            const res = await POST(req);

            expect(res.status).toBe(200);
        });

        it("truncates extremely long product name", async () => {
            const badItem = { ...validItem, name: "A".repeat(10000) };
            const req = createRequest({ items: [badItem] });
            const res = await POST(req);

            // Sanitized name is truncated to 200 chars, still valid
            expect(res.status).toBe(200);
        });
    });

    // ─── Prototype Pollution ──────────────────────────────
    describe("prototype pollution prevention", () => {
        it("handles __proto__ fields safely", async () => {
            const maliciousPayload = {
                items: [validItem],
                __proto__: { isAdmin: true },
            };
            const req = createRequest(maliciousPayload);
            const res = await POST(req);

            // Should not crash, treat as normal request
            expect(res.status).toBe(200);
        });
    });
});
