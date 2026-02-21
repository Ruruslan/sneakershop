import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
    try {
        const { items } = await request.json();

        if (!items || items.length === 0) {
            return NextResponse.json(
                { error: "Корзина пуста" },
                { status: 400 }
            );
        }

        const lineItems = items.map(
            (item: {
                name: string;
                price: number;
                quantity: number;
                image: string;
                size: number;
            }) => ({
                price_data: {
                    currency: "rub",
                    product_data: {
                        name: item.name,
                        description: `Размер: EU ${item.size}`,
                        images: item.image.startsWith("http")
                            ? [item.image]
                            : [`${process.env.NEXTAUTH_URL || "http://localhost:3000"}${item.image}`],
                    },
                    unit_amount: Math.round(item.price * 100), // Stripe uses kopecks
                },
                quantity: item.quantity,
            })
        );

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
