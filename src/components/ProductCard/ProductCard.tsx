"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./ProductCard.module.css";

export interface ProductCardProps {
    id: string;
    name: string;
    slug: string;
    brand: string;
    price: number;
    image: string;
    colors?: string[];
    badge?: string;
}

export default function ProductCard({
    id,
    name,
    slug,
    brand,
    price,
    image,
    colors,
    badge,
}: ProductCardProps) {
    return (
        <Link href={`/product/${slug}`} className={styles.productCard}>
            <div className={styles.imageWrapper}>
                <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    style={{ objectFit: "cover" }}
                />
                {badge && (
                    <div className={styles.productBadge}>
                        <span className="badge">{badge}</span>
                    </div>
                )}
                <button
                    className={styles.quickAction}
                    onClick={(e) => {
                        e.preventDefault();
                        // TODO: add to cart
                    }}
                    aria-label="Добавить в корзину"
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
                </button>
            </div>

            <div className={styles.productInfo}>
                <span className={styles.productBrand}>{brand}</span>
                <h3 className={styles.productName}>{name}</h3>
                <div className={styles.productPrice}>
                    <span className={styles.currentPrice}>
                        {price.toLocaleString("ru-RU")} ₽
                    </span>
                </div>
                {colors && colors.length > 0 && (
                    <div className={styles.productColors}>
                        {colors.map((color) => (
                            <span
                                key={color}
                                className={styles.colorDot}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Link>
    );
}
