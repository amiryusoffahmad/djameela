import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Sparkles, ShieldCheck, Truck, CreditCard, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-beige text-brand-charcoal font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative bg-[#EFE8E1] py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-burgundy font-bold leading-tight">
              Wangian Yang Menemani Setiap Cerita Hidupmu
            </h1>
            <p className="text-brand-charcoal/80 text-base md:text-lg max-w-lg leading-relaxed">
              Satu semburan, seribu rasa. Djameelaa, lebih dari sekadar wangian.
            </p>
            <div>
              <Link
                href="/shop"
                className="inline-flex items-center gap-3 bg-brand-burgundy text-brand-beige px-8 py-4 rounded-full font-medium hover:bg-brand-burgundy/90 transition-all shadow-md hover:gap-4"
              >
                <span>BELI SEKARANG</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative h-100 md:h-125 w-full rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1200&auto=format&fit=crop"
              alt="Djameelaa Hero"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION BAR */}
      <section className="border-y border-brand-sand bg-white py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Sparkles className="w-6 h-6 text-brand-burgundy" />
            <span className="font-medium text-sm text-brand-burgundy">Wangian Eksklusif & Tahan Lama</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-brand-burgundy" />
            <span className="font-medium text-sm text-brand-burgundy">Bahan Premium Selamat Digunakan</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Truck className="w-6 h-6 text-brand-burgundy" />
            <span className="font-medium text-sm text-brand-burgundy">Penghantaran Seluruh Malaysia</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CreditCard className="w-6 h-6 text-brand-burgundy" />
            <span className="font-medium text-sm text-brand-burgundy">Pembayaran Selamat & Mudah</span>
          </div>
        </div>
      </section>

      {/* KOLEKSI PILIHAN */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-burgundy font-bold">
            Koleksi Pilihan
          </h2>
          <p className="text-brand-charcoal/70 text-sm">
            Wangian untuk setiap suasana dan personaliti.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-brand-sand shadow-sm space-y-4 text-center">
            <div className="relative h-64 w-full rounded-xl overflow-hidden bg-brand-beige">
              <Image
                src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop"
                alt="Embun Sence"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-brand-burgundy">Embun Sence</h3>
              <p className="text-brand-rose font-bold mt-1">RM129</p>
            </div>
            <Link
              href="/product/embun-sence"
              className="block w-full border border-brand-burgundy text-brand-burgundy py-2.5 rounded-full text-sm font-medium hover:bg-brand-burgundy hover:text-brand-beige transition-colors"
            >
              Lihat Produk
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-brand-sand shadow-sm space-y-4 text-center">
            <div className="relative h-64 w-full rounded-xl overflow-hidden bg-brand-beige">
              <Image
                src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=600&auto=format&fit=crop"
                alt="Set Hadiah"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-brand-burgundy">Set Hadiah</h3>
              <p className="text-brand-rose font-bold mt-1">RM199</p>
            </div>
            <Link
              href="/shop"
              className="block w-full border border-brand-burgundy text-brand-burgundy py-2.5 rounded-full text-sm font-medium hover:bg-brand-burgundy hover:text-brand-beige transition-colors"
            >
              Lihat Produk
            </Link>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-brand-sand shadow-sm space-y-4 text-center">
            <div className="relative h-64 w-full rounded-xl overflow-hidden bg-brand-beige">
              <Image
                src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=600&auto=format&fit=crop"
                alt="Wangian Travel Size"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-brand-burgundy">Wangian Travel Size</h3>
              <p className="text-brand-rose font-bold mt-1">RM39</p>
            </div>
            <Link
              href="/shop"
              className="block w-full border border-brand-burgundy text-brand-burgundy py-2.5 rounded-full text-sm font-medium hover:bg-brand-burgundy hover:text-brand-beige transition-colors"
            >
              Lihat Produk
            </Link>
          </div>
        </div>
      </section>

      {/* CALLOUT BANNER */}
      <section className="bg-brand-rose/20 py-16 px-6 text-center space-y-6">
        <h2 className="font-serif text-3xl md:text-4xl text-brand-burgundy font-bold">
          Lebih Dari Sekadar Wangian
        </h2>
        <p className="text-brand-charcoal/80 max-w-xl mx-auto">
          Ia adalah rasa, memori dan keyakinan.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-brand-burgundy text-brand-beige px-8 py-3.5 rounded-full font-medium hover:bg-brand-burgundy/90 transition-colors"
        >
          TEROKAI KOLEKSI →
        </Link>
      </section>
    </div>
  );
}