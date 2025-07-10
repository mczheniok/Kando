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
    default: "Kando — маркетплейс оголошень в Україні"
  },  
  description: "Kando — це онлайн-маркетплейс оголошень, що дозволяє легко розміщувати, знаходити та переглядати пропозиції з оренди нерухомості, одягу, взуття та інших категорій. Платформа створена для зручної взаємодії між користувачами з України.",
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
