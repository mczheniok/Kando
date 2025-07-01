import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata = {
  title: {
    default: "Kando"
  },  
  description: "Discover a wide range of products on Kando, your go-to online marketplace. Shop electronics, fashion, home goods, and more at competitive prices. Enjoy easy navigation. Kando – the best place for online shopping in Ukraine. Compare prices, read reviews, and shop with confidence today!",
  icons: {
    icon: "/logos/kando.ico"
  },
  keywords: "маркетплейс онлайн, интернет-магазин, інтернет-магазин, купить онлайн, купити онлайн, онлайн шоппинг, онлайн шопінг, доставка товаров, доставка товарів, скидки онлайн, знижки онлайн, акции интернет-магазина, акції інтернет-магазину, лучшие предложения онлайн, кращі пропозиції онлайн, популярные товары, популярні товари, гарантия качества, гарантія якості, быстрая доставка, швидка доставка, выгодные цены, вигідні ціни, новинки онлайн, обзоры товаров, огляди товарів, безопасные покупки, безпечні покупки"
};



export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
