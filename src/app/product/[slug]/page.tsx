"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard/ProductCard";
import { getProductBySlug, allProducts } from "@/data/products";
import { useCartStore } from "@/store/cart";
import styles from "./page.module.css";

export default function ProductPage() {
    const params = useParams();
    const slug = params.slug as string;
    const product = getProductBySlug(slug);
    const addItem = useCartStore((s) => s.addItem);

    const [selectedSize, setSelectedSize] = useState<number | null>(null);
    const [added, setAdded] = useState(false);

    if (!product) {
        return (
            <div className={styles.productPage}>
                <div className="container">
                    <div className={styles.notFound}>
                        <h1 className={styles.notFoundTitle}>Товар не найден</h1>
                        <p className={styles.notFoundDesc}>
                            К сожалению, мы не смогли найти этот товар.
                        </p>
                        <Link href="/shop" className="btn btn-primary">
                            Вернуться в каталог
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const relatedProducts = allProducts
        .filter((p) => p.brand === product.brand && p.id !== product.id)
        .slice(0, 4);

    const handleAddToCart = () => {
        if (!selectedSize) return;
        addItem({
            id: product.id,
            name: product.name,
            slug: product.slug,
            brand: product.brand,
            price: product.price,
            image: product.image,
            size: selectedSize,
            quantity: 1,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 3000);
    };

    return (
        <div className={styles.productPage}>
            <div className="container">
                {/* Breadcrumb */}
                <nav className={styles.breadcrumb}>
                    <Link href="/">Главная</Link>
                    <span className={styles.breadcrumbSep}>/</span>
                    <Link href="/shop">Каталог</Link>
                    <span className={styles.breadcrumbSep}>/</span>
                    <Link href={`/shop?brand=${product.brand.toLowerCase()}`}>
                        {product.brand}
                    </Link>
                    <span className={styles.breadcrumbSep}>/</span>
                    <span>{product.name}</span>
                </nav>

                {/* Main layout */}
                <div className={styles.productLayout}>
                    {/* Image */}
                    <div className={styles.imageSection}>
                        <div className={styles.mainImage}>
                            {product.badge && (
                                <div className={styles.imageBadge}>
                                    <span className="badge">{product.badge}</span>
                                </div>
                            )}
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                    </div>

                    {/* Details */}
                    <div className={styles.details}>
                        <div>
                            <span className={styles.productBrand}>{product.brand}</span>
                            <h1 className={styles.productName}>{product.name}</h1>
                        </div>

                        <div className={styles.productPrice}>
                            {product.price.toLocaleString("ru-RU")} ₽
                        </div>

                        <p className={styles.productDesc}>{product.description}</p>

                        <div className={styles.divider} />

                        {/* Colors */}
                        {product.colors && product.colors.length > 0 && (
                            <div className={styles.colorSection}>
                                <span className={styles.colorLabel}>Цвет</span>
                                <div className={styles.colorOptions}>
                                    {product.colors.map((color, idx) => (
                                        <button
                                            key={idx}
                                            className={`${styles.colorBtn} ${idx === 0 ? styles.colorBtnActive : ""}`}
                                            style={{ backgroundColor: color }}
                                            aria-label={`Цвет ${color}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Sizes */}
                        <div className={styles.sizeSection}>
                            <div className={styles.sizeHeader}>
                                <span className={styles.sizeLabel}>
                                    Размер (EU){" "}
                                    {!selectedSize && (
                                        <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
                                            — выберите размер
                                        </span>
                                    )}
                                </span>
                                <button className={styles.sizeGuide}>Таблица размеров</button>
                            </div>
                            <div className={styles.sizeGrid}>
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        className={`${styles.sizeBtn} ${selectedSize === size ? styles.sizeBtnActive : ""}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.divider} />

                        {/* Actions */}
                        <div className={styles.actions}>
                            <button
                                className={styles.addToCartBtn}
                                onClick={handleAddToCart}
                                disabled={!selectedSize}
                            >
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
                                {selectedSize ? "Добавить в корзину" : "Выберите размер"}
                            </button>
                            <button className={styles.wishlistBtn} aria-label="В избранное">
                                ♡
                            </button>
                        </div>

                        {/* Added notice */}
                        {added && (
                            <div className={styles.addedNotice}>
                                ✅ Товар добавлен в корзину!
                            </div>
                        )}

                        {/* Guarantees */}
                        <div className={styles.guarantees}>
                            <div className={styles.guarantee}>
                                <span className={styles.guaranteeIcon}>✅</span>
                                <span className={styles.guaranteeTitle}>Оригинал</span>
                                <span className={styles.guaranteeDesc}>
                                    Гарантия подлинности
                                </span>
                            </div>
                            <div className={styles.guarantee}>
                                <span className={styles.guaranteeIcon}>🚀</span>
                                <span className={styles.guaranteeTitle}>1-3 дня</span>
                                <span className={styles.guaranteeDesc}>
                                    Быстрая доставка
                                </span>
                            </div>
                            <div className={styles.guarantee}>
                                <span className={styles.guaranteeIcon}>🔄</span>
                                <span className={styles.guaranteeTitle}>14 дней</span>
                                <span className={styles.guaranteeDesc}>
                                    Возврат и обмен
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related */}
                {relatedProducts.length > 0 && (
                    <section className={styles.related}>
                        <h2 className={styles.relatedTitle}>Похожие товары</h2>
                        <div className={styles.relatedGrid}>
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.id} {...p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
