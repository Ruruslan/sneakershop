"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("Неверный email или пароль");
            setLoading(false);
        } else {
            router.push("/");
            router.refresh();
        }
    };

    return (
        <div className={styles.authPage}>
            <div className={styles.authCard}>
                <div className={styles.authLogo}>
                    <span className={styles.authLogoIcon}>👟</span>
                    SNKRS
                </div>

                <h1 className={styles.authTitle}>Вход в аккаунт</h1>
                <p className={styles.authSubtitle}>
                    Войдите, чтобы отслеживать заказы и получать персональные
                    предложения
                </p>

                {error && <div className={styles.error}>{error}</div>}

                <form className={styles.authForm} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className={styles.formInput}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Пароль</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className={styles.formInput}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={loading}
                    >
                        {loading ? "Вход..." : "Войти"}
                    </button>
                </form>

                <div className={styles.demoInfo}>
                    <strong>Демо-аккаунт:</strong>
                    <br />
                    Email: demo@snkrs.ru | Пароль: demo123
                    <br />
                    Admin: admin@snkrs.ru | Пароль: admin123
                </div>

                <div className={styles.authFooter}>
                    Нет аккаунта?{" "}
                    <Link href="/register">Зарегистрироваться</Link>
                </div>
            </div>
        </div>
    );
}
