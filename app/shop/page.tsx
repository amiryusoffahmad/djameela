import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/woocommerce";
import { Star } from "lucide-react";
import Navbar from "@/components/Navbar";

interface ProductNode {
  id: string;
  name: string;
  slug: string;
  price?: string;
  regularPrice?: string;
  image?: {
    sourceUrl: string;
    altText: string;
  };
  shortDescription?: string;
}

export default async function ShopPage() {
  const products = (await getProducts()) as ProductNode[];
  const categories = ["Semua", "Perfume Mist", "Set Hadiah", "Travel Size", "Aksesori"];

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#2D2826] pb-20">
      <Navbar />

      {/* TAJUK & SUBTAJUK KOLEKSI */}
      <section className="text-center pt-10 pb-6 px-4 max-w-3xl mx-auto space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2826]">
          Koleksi Djameelaa
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm">
          Temui wangian yang sesuai dengan cerita hidup anda.
        </p>
      </section>

      {/* FILTER PILLS KATEGORI */}
      <section className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat, idx) => (
            <button
              key={cat}
              className={`px-5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition shadow-sm ${
                idx === 0
                  ? "bg-[#A86B6C] text-white"
                  : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* SENARAI PRODUK GRID */}
      <section className="max-w-7xl mx-auto px-4 md:px-6">
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200">
            <p className="text-stone-500 text-sm">
              Tiada produk ditemui buat masa ini. Sila pastikan anda telah menerbitkan produk di WooCommerce.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-3 md:p-4 border border-stone-100 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all duration-300"
              >
                <div>
                  {/* Gambar Produk */}
                  <Link
                    href={`/product/${product.slug}`}
                    className="block relative aspect-square rounded-xl overflow-hidden bg-stone-100 mb-3"
                  >
                    {product.image?.sourceUrl ? (
                      <Image
                        src={product.image.sourceUrl}
                        alt={product.image.altText || product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-xs text-stone-400">
                        Tiada Gambar
                      </div>
                    )}
                  </Link>

                  {/* Maklumat Produk */}
                  <div className="space-y-1">
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-semibold text-stone-900 text-xs md:text-sm line-clamp-1 hover:text-[#A86B6C] transition">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="font-bold text-stone-900 text-xs md:text-sm">
                      {product.price ? product.price : "RM129"}
                    </p>

                    {/* Rating & Ulasan */}
                    <div className="flex items-center gap-1 text-[11px] text-stone-500 pt-0.5">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} fill="currentColor" />
                        ))}
                      </div>
                      <span>(128)</span>
                    </div>
                  </div>
                </div>

                {/* Butang Tambah ke Troli */}
                <div className="mt-4">
                  <Link
                    href={`/product/${product.slug}`}
                    className="w-full py-2.5 bg-[#A86B6C] text-white rounded-xl text-xs font-medium hover:bg-[#8F5758] transition flex items-center justify-center gap-1 shadow-sm"
                  >
                    + Tambah ke Troli
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

{/* BANNER PROMO BAWAH */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-12">
        <div className="relative rounded-3xl overflow-hidden bg-[#5C4033] text-white p-8 md:p-12 flex flex-col items-start justify-center min-h-65">
          
          {/* Gambar di sebelah kanan (Macam dalam design rujukan) */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 md:w-2/5 h-full opacity-90 hidden sm:block">
            <Image
              src="/image.png" // Tukar path ni ikut nama fail gambar anda dalam folder public
              alt="Djameelaa Perfume"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-left"
            />
            {/* Gradien lembut supaya teks di sebelah kiri lebih jelas dibaca */}
            <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-[#5C4033] to-transparent sm:block hidden" />
          </div>

          {/* Kandungan Teks */}
          <div className="relative z-10 max-w-md space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
              Setiap Wangian Ada Ceritanya
            </h2>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-white text-[#2D2826] px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-stone-100 transition shadow-md"
            >
              LIHAT SEMUA PRODUK &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}