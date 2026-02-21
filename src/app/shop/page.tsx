"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import { allProducts, brands, categories, filterProducts } from "@/data/products";
import styles from "./page.module.css";

export default function ShopPage() {
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("newest");
    const [search, setSearch] = useState("");
    const [minPrice, setMinPrice] = useState<string>("");
    const [maxPrice, setMaxPrice] = useState<string>("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const filteredProducts = useMemo(
        () =>
            filterProducts({
                brand: brand || undefined,
                category: category || undefined,
                sort,
                search: search || undefined,
                minPrice: minPrice ? Number(minPrice) : undefined,
                maxPrice: maxPrice ? Number(maxPrice) : undefined,
            }),
        [brand, category, sort, search, minPrice, maxPrice]
    );

    const hasActiveFilters = brand || category || minPrice || maxPrice || search;

    const resetFilters = () => {
        setBrand("");
        setCategory("");
        setSort("newest");
        setSearch("");
        setMinPrice("");
        setMaxPrice("");
    };

    return (
        <div className={styles.shopPage}>
            <div className="container">
                {/* Header */}
                <div className={styles.shopHeader}>
                    <h1 className={styles.shopTitle}>Каталог</h1>
                    <p className={styles.shopSubtitle}>
                        Найдите идеальную пару кроссовок из нашей коллекции
                    </p>
                </div>

                <div className={styles.shopLayout}>
                    {/* ─── Sidebar ─────────────────────────────── */}
                    <aside
                        className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}
                    >
                        {/* Search */}
                        <div className={styles.searchWrapper}>
                            <svg
                                className={styles.searchIcon}
                                width="18"
                                height="18"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Поиск кроссовок..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className={styles.searchInput}
                            />
                        </div>

                        {/* Brands */}
                        <div className={styles.filterGroup}>
                            <span className={styles.filterLabel}>Бренд</span>
                            <button
                                className={`${styles.filterOption} ${!brand ? styles.filterOptionActive : ""}`}
                                onClick={() => setBrand("")}
                            >
                                Все бренды
                            </button>
                            {brands.slice(0, 4).map((b) => (
                                <button
                                    key={b.slug}
                                    className={`${styles.filterOption} ${brand === b.slug ? styles.filterOptionActive : ""}`}
                                    onClick={() => setBrand(brand === b.slug ? "" : b.slug)}
                                >
                                    {b.name}
                                </button>
                            ))}
                        </div>

                        {/* Category */}
                        <div className={styles.filterGroup}>
                            <span className={styles.filterLabel}>Категория</span>
                            {categories.map((c) => (
                                <button
                                    key={c.slug}
                                    className={`${styles.filterOption} ${category === c.slug ? styles.filterOptionActive : ""}`}
                                    onClick={() => setCategory(c.slug)}
                                >
                                    {c.name}
                                </button>
                            ))}
                        </div>

                        {/* Price */}
                        <div className={styles.filterGroup}>
                            <span className={styles.filterLabel}>Цена, ₽</span>
                            <div className={styles.priceRange}>
                                <input
                                    type="number"
                                    placeholder="От"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    className={styles.priceInput}
                                />
                                <span className={styles.priceSeparator}>—</span>
                                <input
                                    type="number"
                                    placeholder="До"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className={styles.priceInput}
                                />
                            </div>
                        </div>

                        {/* Reset */}
                        {hasActiveFilters && (
                            <button className={styles.resetBtn} onClick={resetFilters}>
                                Сбросить фильтры
                            </button>
                        )}

                        {/* Close mobile sidebar */}
                        {sidebarOpen && (
                            <button
                                className="btn btn-primary"
                                onClick={() => setSidebarOpen(false)}
                                style={{ marginTop: "auto" }}
                            >
                                Показать {filteredProducts.length} товар(ов)
                            </button>
                        )}
                    </aside>

                    {/* ─── Content ─────────────────────────────── */}
                    <div className={styles.shopContent}>
                        {/* Toolbar */}
                        <div className={styles.toolbar}>
                            <div>
                                <span className={styles.resultCount}>
                                    Найдено{" "}
                                    <span className={styles.resultCountBold}>
                                        {filteredProducts.length}
                                    </span>{" "}
                                    товар(ов)
                                </span>
                            </div>

                            <div className={styles.toolbarRight}>
                                <button
                                    className={styles.mobileFilterBtn}
                                    onClick={() => setSidebarOpen(true)}
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
                                    </svg>
                                    Фильтры
                                </button>

                                <select
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                    className={styles.sortSelect}
                                >
                                    <option value="newest">Новинки</option>
                                    <option value="price-asc">Цена: по возрастанию</option>
                                    <option value="price-desc">Цена: по убыванию</option>
                                    <option value="name-asc">По названию</option>
                                </select>
                            </div>
                        </div>

                        {/* Active filters */}
                        {hasActiveFilters && (
                            <div className={styles.activeFilters}>
                                {brand && (
                                    <button
                                        className={styles.activeFilter}
                                        onClick={() => setBrand("")}
                                    >
                                        {brands.find((b) => b.slug === brand)?.name}
                                        <span className={styles.activeFilterX}>×</span>
                                    </button>
                                )}
                                {category && (
                                    <button
                                        className={styles.activeFilter}
                                        onClick={() => setCategory("")}
                                    >
                                        {categories.find((c) => c.slug === category)?.name}
                                        <span className={styles.activeFilterX}>×</span>
                                    </button>
                                )}
                                {(minPrice || maxPrice) && (
                                    <button
                                        className={styles.activeFilter}
                                        onClick={() => {
                                            setMinPrice("");
                                            setMaxPrice("");
                                        }}
                                    >
                                        {minPrice || "0"} — {maxPrice || "∞"} ₽
                                        <span className={styles.activeFilterX}>×</span>
                                    </button>
                                )}
                                {search && (
                                    <button
                                        className={styles.activeFilter}
                                        onClick={() => setSearch("")}
                                    >
                                        «{search}»
                                        <span className={styles.activeFilterX}>×</span>
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Product Grid */}
                        <div className={styles.productGrid}>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <ProductCard key={product.id} {...product} />
                                ))
                            ) : (
                                <div className={styles.emptyState}>
                                    <div className={styles.emptyIcon}>🔍</div>
                                    <h3 className={styles.emptyTitle}>Ничего не найдено</h3>
                                    <p className={styles.emptyDesc}>
                                        Попробуйте изменить параметры фильтрации или{" "}
                                        <button
                                            onClick={resetFilters}
                                            style={{
                                                color: "var(--accent)",
                                                fontWeight: 600,
                                                cursor: "pointer",
                                                background: "none",
                                                border: "none",
                                                fontSize: "inherit",
                                            }}
                                        >
                                            сбросить фильтры
                                        </button>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
