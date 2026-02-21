import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Providers from "@/components/Providers/Providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SNKRS — Премиальные Кроссовки",
  description:
    "Интернет-магазин оригинальных кроссовок от Nike, Adidas, Jordan и New Balance. Новинки, лимитированные релизы и быстрая доставка.",
  keywords: [
    "кроссовки",
    "sneakers",
    "Nike",
    "Adidas",
    "Jordan",
    "купить кроссовки",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.variable}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
