"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Star, ShoppingBag, ArrowRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  slug: string;
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Embun Sence",
    category: "Perfume Mist",
    price: 129,
    rating: 5,
    reviewsCount: 128,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop",
    slug: "embun-sence",
  },
  {
    id: "2",
    name: "Rindu",
    category: "Perfume Mist",
    price: 129,
    rating: 5,
    reviewsCount: 96,
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
    slug: "rindu",
  },
  {
    id: "3",
    name: "Sakinah",
    category: "Perfume Mist",
    price: 129,
    rating: 5,
    reviewsCount: 87,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=600&auto=format&fit=crop",
    slug: "sakinah",
  },
  {
    id: "4",
    name: "Set Koleksi Djameelaa",
    category: "Set Hadiah",
    price: 199,
    rating: 5,
    reviewsCount: 64,
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=600&auto=format&fit=crop",
    slug: "set-koleksi-djameelaa",
  },
  {
    id: "5",
    name: "Travel Size Set",
    category: "Travel Size",
    price: 39,
    rating: 5,
    reviewsCount: 112,
    image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=600&auto=format&fit=crop",
    slug: "travel-size-set",
  },
  {
    id: "6",
    name: "Gift Box Premium",
    category: "Aksesori",
    price: 29,
    rating: 5,
    reviewsCount: 45,
    image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=600&auto=format&fit=crop",
    slug: "gift-box-premium",
  },
];

const CATEGORIES = ["Semua", "Perfume Mist", "Set Hadiah", "Travel Size", "Aksesori"];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredProducts =
    activeCategory === "Semua"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-brand-beige text-brand-charcoal font-sans pb-20">
      <Navbar />

      {/* HEADER SECTION */}
      <section className="text-center pt-12 pb-8 px-6">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-burgundy">
          Koleksi Djameelaa
        </h1>
        <p className="text-brand-charcoal/70 text-sm md:text-base mt-2">
          Temui wangian yang sesuai dengan cerita hidup anda.
        </p>

        {/* CATEGORY FILTER TABS */}
        <div className="flex flex-wrap justify-center items-center gap-3 mt-8 max-w-3xl mx-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-brand-burgundy text-brand-beige shadow-sm"
                  : "bg-white text-brand-charcoal border border-brand-sand hover:border-brand-burgundy"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-5 rounded-2xl border border-brand-sand shadow-sm space-y-4 hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <Link href={`/product/${product.slug}`} className="block relative h-64 w-full rounded-xl overflow-hidden bg-brand-beige mb-4 group">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <div className="space-y-1">
                  <Link href={`/product/${product.slug}`} className="font-serif text-lg font-bold text-brand-burgundy hover:underline">
                    {product.name}
                  </Link>
                  <p className="text-brand-burgundy font-bold text-base">
                    RM{product.price}
                  </p>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <div className="flex text-amber-400">
                      {[...Array(product.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-brand-charcoal/60">
                      ({product.reviewsCount})
                    </span>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                className="w-full bg-brand-rose/20 hover:bg-brand-burgundy hover:text-brand-beige text-brand-burgundy border border-brand-rose/40 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 mt-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>+ Tambah ke Troli</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* BANNER PROMO */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <div className="relative rounded-3xl overflow-hidden bg-brand-burgundy text-brand-beige p-8 md:p-14 flex flex-col items-center text-center space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Setiap Wangian Ada Ceritanya
          </h2>
          <p className="text-brand-sand text-sm max-w-md">
            Pilih wangian yang paling mewakili identiti anda hari ini.
          </p>
          <Link
            href="/product/embun-sence"
            className="inline-flex items-center gap-2 bg-brand-beige text-brand-burgundy font-semibold px-6 py-3 rounded-full hover:bg-white transition-colors text-xs tracking-wider uppercase mt-2"
          >
            <span>Lihat Produk Utama</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}