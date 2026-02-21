import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerGrid}>
                    {/* Brand */}
                    <div className={styles.footerBrand}>
                        <div className={styles.footerLogo}>
                            <span className={styles.footerLogoIcon}>👟</span>
                            SNKRS
                        </div>
                        <p className={styles.footerDesc}>
                            Премиальные кроссовки от лучших мировых брендов. Оригинальная
                            продукция с гарантией подлинности.
                        </p>
                        <div className={styles.socialLinks}>
                            <a
                                href="#"
                                className={styles.socialLink}
                                aria-label="Instagram"
                            >
                                📷
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="Telegram">
                                ✈️
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="Twitter">
                                🐦
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div className={styles.footerColumn}>
                        <h4>Каталог</h4>
                        <ul>
                            <li>
                                <Link href="/shop?brand=nike">Nike</Link>
                            </li>
                            <li>
                                <Link href="/shop?brand=adidas">Adidas</Link>
                            </li>
                            <li>
                                <Link href="/shop?brand=jordan">Jordan</Link>
                            </li>
                            <li>
                                <Link href="/shop?brand=new-balance">New Balance</Link>
                            </li>
                            <li>
                                <Link href="/shop">Все кроссовки</Link>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.footerColumn}>
                        <h4>Информация</h4>
                        <ul>
                            <li>
                                <Link href="/about">О магазине</Link>
                            </li>
                            <li>
                                <Link href="/delivery">Доставка</Link>
                            </li>
                            <li>
                                <Link href="/returns">Возврат</Link>
                            </li>
                            <li>
                                <Link href="/sizing">Таблица размеров</Link>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.footerColumn}>
                        <h4>Помощь</h4>
                        <ul>
                            <li>
                                <Link href="/contact">Контакты</Link>
                            </li>
                            <li>
                                <Link href="/faq">FAQ</Link>
                            </li>
                            <li>
                                <Link href="/privacy">Политика конфиденц.</Link>
                            </li>
                            <li>
                                <Link href="/terms">Условия и положения</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className={styles.footerBottom}>
                    <p className={styles.footerCopyright}>
                        © {new Date().getFullYear()} SNKRS. Все права защищены.
                    </p>
                    <div className={styles.footerPayments}>
                        <span>💳 Visa</span>
                        <span>💳 Mastercard</span>
                        <span>💳 Stripe</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
