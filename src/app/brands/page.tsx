"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/Motion/Motion";

const brandData = [
    {
        name: "Nike",
        slug: "nike",
        country: "🇺🇸 США, Бивертон",
        founded: "1964",
        models: "120+",
        desc: "Крупнейший мировой производитель спортивной обуви и одежды. Nike создаёт инновационные технологии — от Air Max до Flyknit — которые меняют индустрию уже более 60 лет.",
    },
    {
        name: "Adidas",
        slug: "adidas",
        country: "🇩🇪 Германия, Херцогенаурах",
        founded: "1949",
        models: "95+",
        desc: "Немецкий гигант спортивной индустрии. От Superstar до Ultraboost — Adidas объединяет спорт, стиль и устойчивое развитие. Технология Boost произвела революцию в беговом мире.",
    },
    {
        name: "Jordan",
        slug: "jordan",
        country: "🇺🇸 США",
        founded: "1984",
        models: "40+",
        desc: "Бренд, рождённый легендой баскетбола Майклом Джорданом. Air Jordan 1 стали символом уличной культуры и коллекционирования кроссовок. Каждый релиз — событие мирового масштаба.",
    },
    {
        name: "New Balance",
        slug: "new-balance",
        country: "🇺🇸 США, Бостон",
        founded: "1906",
        models: "80+",
        desc: "Один из последних крупных американских производителей кроссовок. New Balance гордится производством Made in USA и Made in UK, сочетая премиальное качество с ретро-дизайном.",
    },
];

export default function BrandsPage() {
    return (
        <div className={styles.brandsPage}>
            <div className="container">
                <FadeIn>
                    <div className={styles.brandsHeader}>
                        <h1 className={styles.brandsTitle}>Наши бренды</h1>
                        <p className={styles.brandsSubtitle}>
                            Мы работаем только с проверенными мировыми брендами и гарантируем
                            подлинность каждой пары
                        </p>
                    </div>
                </FadeIn>

                <StaggerContainer className={styles.brandsGrid} staggerDelay={0.12}>
                    {brandData.map((brand) => (
                        <StaggerItem key={brand.slug}>
                            <div className={styles.brandCard}>
                                <div className={styles.brandCardHeader}>
                                    <h2 className={styles.brandName}>{brand.name}</h2>
                                    <span className={styles.brandCountry}>{brand.country}</span>
                                </div>

                                <p className={styles.brandDesc}>{brand.desc}</p>

                                <div className={styles.brandMeta}>
                                    <div className={styles.brandStat}>
                                        <span className={styles.brandStatValue}>
                                            {brand.founded}
                                        </span>
                                        <span className={styles.brandStatLabel}>Основан</span>
                                    </div>
                                    <div className={styles.brandStat}>
                                        <span className={styles.brandStatValue}>
                                            {brand.models}
                                        </span>
                                        <span className={styles.brandStatLabel}>Моделей</span>
                                    </div>
                                </div>

                                <Link
                                    href={`/shop?brand=${brand.slug}`}
                                    className={styles.brandLink}
                                >
                                    Смотреть коллекцию →
                                </Link>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                <FadeIn>
                    <div className={styles.brandsCta}>
                        <h2 className={styles.brandsCtaTitle}>Ищете конкретную модель?</h2>
                        <p className={styles.brandsCtaDesc}>
                            Загляните в каталог — у нас более 500 моделей от лучших мировых
                            брендов
                        </p>
                        <Link href="/shop" className="btn btn-primary btn-lg">
                            Перейти в каталог
                        </Link>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}
