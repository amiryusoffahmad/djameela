import type { Metadata } from "next";
import "./globals.css";
import CartDrawer from "../components/CartDrawer";

export const metadata: Metadata = {
  title: "DJAMEELAA - Scent Your Story",
  description: "Eksklusif Perfume Mist & Wangian Mesra Muslimah",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ms">
      <body className="bg-brand-beige text-brand-charcoal antialiased">
        <main>{children}</main>
        <CartDrawer />
      </body>
    </html>
  );
}