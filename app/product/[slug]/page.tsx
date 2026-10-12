"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  Star,
  ShieldCheck,
  Truck,
  Sparkles,
  Minus,
  Plus,
  Check,
} from "lucide-react";

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("tentang");

  const images = [
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop",
  ];

  return (
    <div className="min-h-screen bg-brand-beige text-brand-charcoal font-sans pb-20">
      <Navbar />

      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-6 pt-6 text-xs text-brand-charcoal/60 flex items-center gap-2">
        <Link href="/" className="hover:text-brand-burgundy">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-brand-burgundy">Produk</Link>
        <span>/</span>
        <span className="text-brand-burgundy font-medium">Embun Sence</span>
      </div>

      {/* PRODUCT MAIN SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-2 gap-12 items-start">
        {/* GALLERY */}
        <div className="space-y-4">
          <div className="relative h-105 md:h-125 w-full rounded-2xl overflow-hidden bg-white border border-brand-sand shadow-sm">
            <Image
              src={images[selectedImage]}
              alt="Embun Sence"
              fill
              className="object-cover transition-all duration-300"
              priority
            />
          </div>

          {/* THUMBNAILS */}
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative h-20 rounded-xl overflow-hidden border-2 transition-all ${
                  selectedImage === idx
                    ? "border-brand-burgundy scale-95"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div className="space-y-6">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-burgundy">
              Embun Sence
            </h1>
            <p className="text-sm text-brand-rose font-medium mt-1">Perfume Mist | 100ml</p>
            <p className="text-2xl font-bold text-brand-burgundy mt-3">RM129</p>

            {/* RATING */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs text-brand-charcoal/70 font-medium">(128 ulasan)</span>
            </div>
          </div>

          <p className="text-brand-charcoal/80 text-sm leading-relaxed border-t border-brand-sand/60 pt-4">
            Wangian lembut dan menyegarkan, dicipta untuk wanita yang mahu tampil yakin, anggun dan memikat dalam setiap langkah.
          </p>

          {/* FEATURES BULLETS */}
          <div className="space-y-2.5 text-xs text-brand-charcoal/80">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-burgundy" />
              <span>Tahan lama sehingga 12 jam</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-burgundy" />
              <span>Wangian eksklusif bertaraf premium</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-burgundy" />
              <span>Sesuai untuk harian & majlis khas</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-burgundy" />
              <span>Mesra wuduk & mudah dibawa ke mana-mana</span>
            </div>
          </div>

          {/* QUANTITY & ADD TO CART */}
          <div className="space-y-4 border-t border-brand-sand/60 pt-6">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-brand-burgundy uppercase tracking-wider">Kuantiti:</span>
              <div className="flex items-center border border-brand-sand bg-white rounded-full px-3 py-1.5 gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-brand-burgundy hover:opacity-75"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-semibold w-4 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-brand-burgundy hover:opacity-75"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button className="flex-1 bg-brand-burgundy text-brand-beige py-3.5 rounded-full font-medium text-sm hover:bg-brand-burgundy/90 transition-colors shadow-md">
                Tambah ke Troli
              </button>
              <Link
                href="/cart"
                className="flex-1 border border-brand-burgundy text-brand-burgundy py-3.5 rounded-full font-medium text-sm hover:bg-brand-burgundy hover:text-brand-beige transition-colors text-center"
              >
                Beli Sekarang
              </Link>
            </div>
          </div>

          {/* TRUST BADGES */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-brand-sand/60 text-center">
            <div className="flex flex-col items-center gap-1.5">
              <Truck className="w-5 h-5 text-brand-burgundy" />
              <span className="text-[10px] text-brand-charcoal/70">Penghantaran Seluruh Malaysia</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <ShieldCheck className="w-5 h-5 text-brand-burgundy" />
              <span className="text-[10px] text-brand-charcoal/70">Pembayaran Selamat (FPX, Card)</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Sparkles className="w-5 h-5 text-brand-burgundy" />
              <span className="text-[10px] text-brand-charcoal/70">Jaminan Produk Original</span>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT TABS SECTION */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-brand-sand shadow-sm">
          <div className="flex border-b border-brand-sand gap-6 md:gap-12 pb-4 overflow-x-auto text-sm font-medium">
            {[
              { id: "tentang", label: "Tentang Produk" },
              { id: "guna", label: "Cara Penggunaan" },
              { id: "bahan", label: "Bahan-Bahan" },
              { id: "ulasan", label: "Ulasan (128)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-brand-burgundy text-brand-burgundy font-bold"
                    : "border-transparent text-brand-charcoal/60 hover:text-brand-burgundy"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="pt-6 text-sm text-brand-charcoal/80 leading-relaxed">
            {activeTab === "tentang" && (
              <p>
                Embun Sence ialah perfume mist yang direka khas dengan haruman feminin yang lembut, segar dan memikat. Sesuai untuk digunakan setiap hari, sama ada di pejabat, majlis khas, mahupun ketika santai bersama yang tersayang.
              </p>
            )}
            {activeTab === "guna" && (
              <p>
                Semburkan pada jarak 15-20cm dari kulit pada titik nadi seperti pergelangan tangan, leher, dan belakang telinga untuk ketahanan haruman yang lebih berpanjangan.
              </p>
            )}
            {activeTab === "bahan" && (
              <p>
                Aqua, Premium Perfume Fragrance Oil, Organic Denatured Alcohol, Glycerin, Natural Plant Extracts (Botanical Blend).
              </p>
            )}
            {activeTab === "ulasan" && (
              <div className="space-y-4">
                <div className="border-b border-brand-sand/40 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-brand-burgundy text-xs">Nur Aisyah</span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-brand-charcoal/70 mt-1">
                    &quot;Wangian Embun Sence sangat lembut dan tahan lama. Saya pakai setiap hari ke pejabat. Memang suka!&quot;
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}