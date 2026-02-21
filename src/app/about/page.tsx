"use client";

import Link from "next/link";
import styles from "./page.module.css";
import {
    FadeIn,
    SlideIn,
    StaggerContainer,
    StaggerItem,
    ScaleIn,
} from "@/components/Motion/Motion";

const values = [
    {
        icon: "🎯",
        title: "Только оригинал",
        desc: "Каждая пара проходит проверку подлинности. Работаем напрямую с официальными дистрибьюторами.",
    },
    {
        icon: "❤️",
        title: "Страсть к кроссовкам",
        desc: "Мы не просто продаём обувь — мы живём сникер-культурой и делимся этой страстью с вами.",
    },
    {
        icon: "🤝",
        title: "Клиент — приоритет",
        desc: "Персональный подход, помощь в выборе размера и быстрое решение любых вопросов.",
    },
    {
        icon: "🌍",
        title: "Устойчивое развитие",
        desc: "Экологичная упаковка и партнёрство с брендами, которые заботятся об окружающей среде.",
    },
    {
        icon: "🚀",
        title: "Скорость и удобство",
        desc: "Быстрая доставка по всей России, простой возврат и обмен в течение 14 дней.",
    },
    {
        icon: "🔒",
        title: "Безопасность",
        desc: "Защищённые платежи, шифрование данных и полная конфиденциальность покупок.",
    },
];

const team = [
    { name: "Алексей С.", role: "Основатель & CEO", avatar: "👨‍💼" },
    { name: "Мария К.", role: "Дизайн-директор", avatar: "👩‍🎨" },
    { name: "Дмитрий Л.", role: "Закупки & Логистика", avatar: "👨‍💻" },
    { name: "Анна В.", role: "Клиентский сервис", avatar: "👩‍💼" },
];

export default function AboutPage() {
    return (
        <div className={styles.aboutPage}>
            <div className="container">
                {/* Hero */}
                <FadeIn>
                    <div className={styles.aboutHero}>
                        <h1 className={styles.aboutTitle}>
                            Мы — <span className={styles.aboutTitleAccent}>SNKRS</span>
                        </h1>
                        <p className={styles.aboutDesc}>
                            Команда энтузиастов, объединённых любовью к кроссовкам. Мы
                            создали место, где каждый найдёт свою идеальную пару от лучших
                            мировых брендов.
                        </p>
                    </div>
                </FadeIn>

                {/* Stats */}
                <StaggerContainer className={styles.stats} staggerDelay={0.08}>
                    {[
                        { value: "500+", label: "Моделей в каталоге" },
                        { value: "50K+", label: "Довольных клиентов" },
                        { value: "4.9★", label: "Средняя оценка" },
                        { value: "1-3", label: "Дня доставки" },
                    ].map((stat, i) => (
                        <StaggerItem key={i}>
                            <div className={styles.statCard}>
                                <div className={styles.statValue}>{stat.value}</div>
                                <div className={styles.statLabel}>{stat.label}</div>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* Story */}
                <div className={styles.storySection}>
                    <SlideIn direction="left">
                        <div className={styles.storyContent}>
                            <span className={styles.storyLabel}>Наша история</span>
                            <h2 className={styles.storyTitle}>
                                От увлечения — к магазину мечты
                            </h2>
                            <p className={styles.storyText}>
                                SNKRS начался в 2022 году как небольшой проект группы
                                друзей-коллекционеров. Мы собирали редкие модели, помогали
                                друзьям найти нужные размеры и делились новостями из мира
                                сникеров.
                            </p>
                            <p className={styles.storyText}>
                                Сегодня SNKRS — это полноценный интернет-магазин с более чем
                                500 моделями от Nike, Adidas, Jordan и New Balance.
                                Мы выросли, но сохранили главное: честность,
                                качество и настоящую любовь к кроссовкам.
                            </p>
                        </div>
                    </SlideIn>
                    <SlideIn direction="right" delay={0.2}>
                        <div className={styles.storyImage}>👟</div>
                    </SlideIn>
                </div>

                {/* Values */}
                <div className={styles.valuesSection}>
                    <FadeIn>
                        <h2 className={styles.valuesSectionTitle}>Наши ценности</h2>
                    </FadeIn>
                    <StaggerContainer className={styles.valuesGrid} staggerDelay={0.08}>
                        {values.map((v, i) => (
                            <StaggerItem key={i}>
                                <div className={styles.valueCard}>
                                    <div className={styles.valueIcon}>{v.icon}</div>
                                    <h3 className={styles.valueTitle}>{v.title}</h3>
                                    <p className={styles.valueDesc}>{v.desc}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>

                {/* Team */}
                <div className={styles.teamSection}>
                    <FadeIn>
                        <h2 className={styles.teamTitle}>Наша команда</h2>
                    </FadeIn>
                    <StaggerContainer className={styles.teamGrid} staggerDelay={0.1}>
                        {team.map((member, i) => (
                            <StaggerItem key={i}>
                                <div className={styles.teamCard}>
                                    <div className={styles.teamAvatar}>{member.avatar}</div>
                                    <div className={styles.teamName}>{member.name}</div>
                                    <div className={styles.teamRole}>{member.role}</div>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>

                {/* CTA */}
                <ScaleIn>
                    <div className={styles.ctaSection}>
                        <h2 className={styles.ctaTitle}>Готовы найти свою пару?</h2>
                        <p className={styles.ctaDesc}>
                            Загляните в каталог или свяжитесь с нами — мы поможем подобрать
                            идеальные кроссовки
                        </p>
                        <div className={styles.ctaActions}>
                            <Link href="/shop" className="btn btn-primary btn-lg">
                                Каталог
                            </Link>
                            <Link href="/brands" className="btn btn-secondary btn-lg">
                                Наши бренды
                            </Link>
                        </div>
                    </div>
                </ScaleIn>
            </div>
        </div>
    );
}
