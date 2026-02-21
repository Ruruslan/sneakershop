import { NextRequest, NextResponse } from "next/server";
import { stripe, isStripeConfigured } from "@/lib/stripe";

// ─── Input validation helpers ────────────────────────────
function sanitizeString(str: unknown, maxLength = 500): string {
    if (typeof str !== "string") return "";
    return str.slice(0, maxLength).replace(/[<>]/g, "");
}

function validateItem(item: Record<string, unknown>): {
    valid: boolean;
    name: string;
    price: number;
    quantity: number;
    image: string;
    size: number;
} {
    const name = sanitizeString(item.name, 200);
    const price = Number(item.price);
    const quantity = Number(item.quantity);
    const image = sanitizeString(item.image, 500);
    const size = Number(item.size);

    const valid =
        name.length > 0 &&
        Number.isFinite(price) &&
        price > 0 &&
        price < 1_000_000 &&
        Number.isFinite(quantity) &&
        Number.isInteger(quantity) &&
        quantity > 0 &&
        quantity <= 99 &&
        image.length > 0 &&
        Number.isFinite(size) &&
        size >= 30 &&
        size <= 60;

    return { valid, name, price, quantity, image, size };
}

// ─── Max items per checkout ──────────────────────────────
const MAX_ITEMS = 50;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const rawItems = body?.items;

        if (!Array.isArray(rawItems) || rawItems.length === 0) {
            return NextResponse.json(
                { error: "Корзина пуста" },
                { status: 400 }
            );
        }

        if (rawItems.length > MAX_ITEMS) {
            return NextResponse.json(
                { error: `Максимум ${MAX_ITEMS} товаров за заказ` },
                { status: 400 }
            );
        }

        // Validate & sanitize every item
        const validatedItems = rawItems.map((item) =>
            validateItem(item as Record<string, unknown>)
        );

        const invalidItems = validatedItems.filter((i) => !i.valid);
        if (invalidItems.length > 0) {
            return NextResponse.json(
                { error: "Некорректные данные товаров" },
                { status: 400 }
            );
        }

        // ─── Demo mode: redirect to success page without Stripe ─
        if (!isStripeConfigured || !stripe) {
            const demoSessionId = `demo_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
            const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
            return NextResponse.json({
                url: `${baseUrl}/checkout/success?session_id=${demoSessionId}`,
            });
        }

        // ─── Production: real Stripe Checkout ───
        const lineItems = validatedItems.map((item) => ({
            price_data: {
                currency: "rub",
                product_data: {
                    name: item.name,
                    description: `Размер: EU ${item.size}`,
                    images: item.image.startsWith("http")
                        ? [item.image]
                        : [
                            `${process.env.NEXTAUTH_URL || "http://localhost:3000"}${item.image}`,
                        ],
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/cart`,
            shipping_address_collection: {
                allowed_countries: ["RU", "BY", "KZ", "UZ", "GE", "AM"],
            },
            locale: "ru",
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Stripe checkout error:", error);
        return NextResponse.json(
            { error: "Ошибка создания сессии оплаты" },
            { status: 500 }
        );
    }
}
