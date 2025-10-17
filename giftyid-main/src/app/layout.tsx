import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from "next";
import { Inter, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import CallToAction from "@/components/layout/CallToAction";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: 'swap',
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin", "vietnamese"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Gifty Tech - Nền tảng cho sự phát triển trong kỷ nguyên số",
  description: "Chúng tôi xây dựng giải pháp công nghệ kết nối doanh nghiệp địa phương với người tiêu dùng trên nền tảng số.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body
        className={`${inter.variable} ${nunitoSans.variable} font-inter antialiased bg-adaptive-light text-adaptive-heading transition-colors duration-300`}
      >
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen bg-adaptive-light">
              {children}
            </main>
            <Footer />
            <ScrollToTop />
            <CallToAction />
          </CartProvider>
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
