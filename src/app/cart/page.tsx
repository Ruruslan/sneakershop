"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import styles from "./page.module.css";

export default function CartPage() {
    const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } =
        useCartStore();
    const [checkoutLoading, setCheckoutLoading] = useState(false);

    const handleCheckout = async () => {
        setCheckoutLoading(true);
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items }),
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert(data.error || "Ошибка оформления заказа");
                setCheckoutLoading(false);
            }
        } catch {
            alert("Ошибка подключения к серверу");
            setCheckoutLoading(false);
        }
    };

    const shipping = totalPrice() >= 10000 ? 0 : 590;
    const total = totalPrice() + shipping;

    if (items.length === 0) {
        return (
            <div className={styles.cartPage}>
                <div className="container">
                    <h1 className={styles.cartTitle}>Корзина</h1>
                    <div className={styles.emptyCart}>
                        <div className={styles.emptyIcon}>🛒</div>
                        <h2 className={styles.emptyTitle}>Корзина пуста</h2>
                        <p className={styles.emptyDesc}>
                            Добавьте кроссовки из каталога, чтобы оформить заказ
                        </p>
                        <Link href="/shop" className="btn btn-primary btn-lg">
                            Перейти в каталог
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.cartPage}>
            <div className="container">
                <h1 className={styles.cartTitle}>
                    Корзина{" "}
                    <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
                        ({totalItems()})
                    </span>
                </h1>

                <div className={styles.cartLayout}>
                    {/* Items */}
                    <div className={styles.cartItems}>
                        {items.map((item) => (
                            <div key={`${item.id}-${item.size}`} className={styles.cartItem}>
                                <Link
                                    href={`/product/${item.slug}`}
                                    className={styles.cartItemImage}
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        sizes="120px"
                                        style={{ objectFit: "cover" }}
                                    />
                                </Link>

                                <div className={styles.cartItemInfo}>
                                    <span className={styles.cartItemBrand}>{item.brand}</span>
                                    <Link
                                        href={`/product/${item.slug}`}
                                        className={styles.cartItemName}
                                    >
                                        {item.name}
                                    </Link>
                                    <span className={styles.cartItemSize}>
                                        Размер: EU {item.size}
                                    </span>
                                </div>

                                <div className={styles.cartItemActions}>
                                    <span className={styles.cartItemPrice}>
                                        {(item.price * item.quantity).toLocaleString("ru-RU")} ₽
                                    </span>

                                    <div className={styles.quantityControl}>
                                        <button
                                            className={styles.quantityBtn}
                                            onClick={() =>
                                                updateQuantity(item.id, item.size, item.quantity - 1)
                                            }
                                        >
                                            −
                                        </button>
                                        <span className={styles.quantityValue}>
                                            {item.quantity}
                                        </span>
                                        <button
                                            className={styles.quantityBtn}
                                            onClick={() =>
                                                updateQuantity(item.id, item.size, item.quantity + 1)
                                            }
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        className={styles.removeBtn}
                                        onClick={() => removeItem(item.id, item.size)}
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className={styles.summary}>
                        <h2 className={styles.summaryTitle}>Ваш заказ</h2>

                        <div className={styles.summaryRows}>
                            <div className={styles.summaryRow}>
                                <span>Товары ({totalItems()})</span>
                                <span className={styles.summaryRowValue}>
                                    {totalPrice().toLocaleString("ru-RU")} ₽
                                </span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Доставка</span>
                                <span
                                    className={styles.summaryRowValue}
                                    style={shipping === 0 ? { color: "#2ecc71" } : {}}
                                >
                                    {shipping === 0
                                        ? "Бесплатно"
                                        : `${shipping.toLocaleString("ru-RU")} ₽`}
                                </span>
                            </div>
                            {shipping > 0 && (
                                <div
                                    className={styles.summaryRow}
                                    style={{ fontSize: "0.8125rem" }}
                                >
                                    <span style={{ color: "var(--accent)" }}>
                                        До бесплатной доставки:{" "}
                                        {(10000 - totalPrice()).toLocaleString("ru-RU")} ₽
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className={styles.summaryDivider} />

                        <div className={styles.summaryTotal}>
                            <span>Итого</span>
                            <span>{total.toLocaleString("ru-RU")} ₽</span>
                        </div>

                        <button
                            className={styles.checkoutBtn}
                            onClick={handleCheckout}
                            disabled={checkoutLoading}
                        >
                            {checkoutLoading ? "Перенаправление..." : "Оформить заказ"}
                            {!checkoutLoading && (
                                <svg
                                    width="20"
                                    height="20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            )}
                        </button>

                        <div className={styles.secureNote}>
                            🔒 Безопасная оплата через Stripe
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
