import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import ProductCard from "@/components/ProductCard/ProductCard";
import { featuredProducts, brands } from "@/data/products";

export default function Home() {
  return (
    <>
      {/* ─── Hero ────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              Новая коллекция 2026
            </div>

            <h1 className={styles.heroTitle}>
              Твой стиль.
              <br />
              <span className={styles.heroTitleAccent}>Твои правила.</span>
            </h1>

            <p className={styles.heroDesc}>
              Откройте для себя эксклюзивные кроссовки от мировых брендов.
              Только оригинальная продукция с гарантией подлинности и быстрой
              доставкой по всей России.
            </p>

            <div className={styles.heroActions}>
              <Link href="/shop" className="btn btn-primary btn-lg">
                Перейти в каталог
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
              </Link>
              <Link href="/brands" className="btn btn-secondary btn-lg">
                Наши бренды
              </Link>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>500+</span>
                <span className={styles.heroStatLabel}>Моделей</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>50K+</span>
                <span className={styles.heroStatLabel}>Клиентов</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>100%</span>
                <span className={styles.heroStatLabel}>Оригинал</span>
              </div>
            </div>
          </div>

          <div className={styles.heroImageWrapper}>
            <div className={styles.heroImageGlow} />
            <div className={styles.heroImage}>
              <Image
                src="/hero-sneaker.png"
                alt="Кроссовки"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "contain" }}
              />
            </div>

            {/* Floating cards */}
            <div className={`${styles.heroFloat} ${styles.heroFloatTop}`}>
              🔥 Лимитированный дроп
            </div>
            <div className={`${styles.heroFloat} ${styles.heroFloatBottom}`}>
              ⚡ Бесплатная доставка
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Products ───────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Популярные модели</h2>
            <Link href="/shop" className={styles.sectionLink}>
              Смотреть все →
            </Link>
          </div>

          <div className={styles.productGrid}>
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Brands ──────────────────────────────────────── */}
      <section className={styles.brandsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Наши бренды</h2>
          </div>

          <div className={styles.brandsGrid}>
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/shop?brand=${brand.slug}`}
                className={styles.brandCard}
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Почему выбирают нас</h2>
          </div>

          <div className={styles.features}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>✅</div>
              <h3 className={styles.featureTitle}>100% Оригинал</h3>
              <p className={styles.featureDesc}>
                Мы работаем только с официальными поставщиками. Каждая пара
                проверена на подлинность.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🚀</div>
              <h3 className={styles.featureTitle}>Быстрая доставка</h3>
              <p className={styles.featureDesc}>
                Доставим в любую точку России за 1-3 дня. Бесплатно при заказе
                от 10 000 ₽.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔄</div>
              <h3 className={styles.featureTitle}>Легкий возврат</h3>
              <p className={styles.featureDesc}>
                Не подошел размер? Бесплатный возврат или обмен в течение 14
                дней.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💬</div>
              <h3 className={styles.featureTitle}>Поддержка 24/7</h3>
              <p className={styles.featureDesc}>
                Наши консультанты всегда на связи в чате, Telegram и по
                телефону.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Newsletter ──────────────────────────────────── */}
      <section className={styles.newsletter}>
        <div className="container">
          <div className={styles.newsletterInner}>
            <h2 className={styles.newsletterTitle}>
              Не пропустите новые дропы
            </h2>
            <p className={styles.newsletterDesc}>
              Подпишитесь на рассылку и узнавайте первыми о новых поступлениях,
              эксклюзивных релизах и скидках.
            </p>
            <form className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Ваш email"
                className={styles.newsletterInput}
              />
              <button type="submit" className="btn btn-primary">
                Подписаться
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
