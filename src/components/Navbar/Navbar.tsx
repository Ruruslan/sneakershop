"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/store/cart";
import styles from "./Navbar.module.css";

const links = [
    { href: "/", label: "Главная" },
    { href: "/shop", label: "Каталог" },
    { href: "/brands", label: "Бренды" },
    { href: "/about", label: "О нас" },
];

export default function Navbar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const totalItems = useCartStore((s) => s.totalItems);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
            <div className={styles.navbarInner}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoIcon}>👟</span>
                    SNKRS
                </Link>

                {/* Links */}
                <div
                    className={`${styles.navLinks} ${mobileOpen ? styles.mobileOpen : ""}`}
                >
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${styles.navLink} ${pathname === link.href ? styles.navLinkActive : ""
                                }`}
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className={styles.navActions}>
                    {/* Search */}
                    <button className={styles.iconBtn} aria-label="Поиск">
                        <svg
                            width="20"
                            height="20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                    </button>

                    {/* Cart */}
                    <Link href="/cart" className={styles.iconBtn} aria-label="Корзина">
                        <svg
                            width="20"
                            height="20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                        >
                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                            <path d="M3 6h18" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                        {totalItems() > 0 && (
                            <span className={styles.cartCount}>{totalItems()}</span>
                        )}
                    </Link>

                    {/* Auth */}
                    {session?.user ? (
                        <div className={styles.userMenu}>
                            <button
                                className={styles.userBtn}
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                            >
                                <span className={styles.userAvatar}>
                                    {session.user.name?.[0]?.toUpperCase() || "U"}
                                </span>
                            </button>
                            {userMenuOpen && (
                                <div className={styles.userDropdown}>
                                    <div className={styles.userDropdownHeader}>
                                        <span className={styles.userDropdownName}>
                                            {session.user.name}
                                        </span>
                                        <span className={styles.userDropdownEmail}>
                                            {session.user.email}
                                        </span>
                                    </div>
                                    <div className={styles.userDropdownDivider} />
                                    <Link
                                        href="/profile"
                                        className={styles.userDropdownItem}
                                        onClick={() => setUserMenuOpen(false)}
                                    >
                                        Мой профиль
                                    </Link>
                                    <Link
                                        href="/orders"
                                        className={styles.userDropdownItem}
                                        onClick={() => setUserMenuOpen(false)}
                                    >
                                        Мои заказы
                                    </Link>
                                    <div className={styles.userDropdownDivider} />
                                    <button
                                        className={styles.userDropdownItem}
                                        onClick={() => signOut()}
                                    >
                                        Выйти
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/login" className={styles.loginBtn}>
                            Войти
                        </Link>
                    )}

                    {/* Mobile toggle */}
                    <button
                        className={styles.menuToggle}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Меню"
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </div>
        </nav>
    );
}
