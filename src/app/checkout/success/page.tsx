"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/cart";
import styles from "./page.module.css";
import { Suspense } from "react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const clearCart = useCartStore((s) => s.clearCart);

    useEffect(() => {
        // Clear cart after successful payment
        clearCart();
    }, [clearCart]);

    return (
        <div className={styles.successPage}>
            <div className={styles.successCard}>
                <div className={styles.successIcon}>🎉</div>
                <h1 className={styles.successTitle}>Заказ оформлен!</h1>
                <p className={styles.successDesc}>
                    Спасибо за покупку! Мы уже начали собирать ваш заказ. Информация
                    о доставке будет отправлена на вашу почту.
                </p>
                {sessionId && (
                    <div className={styles.orderId}>
                        ID: {sessionId.slice(0, 20)}...
                    </div>
                )}
                <div className={styles.successActions}>
                    <Link href="/shop" className="btn btn-primary">
                        Продолжить покупки
                    </Link>
                    <Link href="/" className="btn btn-secondary">
                        На главную
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense
            fallback={
                <div className={styles.successPage}>
                    <div className={styles.successCard}>
                        <div className={styles.successIcon}>⏳</div>
                        <h1 className={styles.successTitle}>Обработка...</h1>
                    </div>
                </div>
            }
        >
            <SuccessContent />
        </Suspense>
    );
}
