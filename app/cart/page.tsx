"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Trash2, Plus, Minus, ArrowRight, Gift } from "lucide-react";
import { useCart } from "@/store/useCart";

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart();
  const [includeGiftBox, setIncludeGiftBox] = useState(false);

  // Fungsi helper untuk tukar string harga kepada nombor (cth: "RM 129" -> 129)
  const parsePrice = (priceStr: string) => {
    if (!priceStr) return 0;
    const clean = priceStr.replace(/[^0-9.]/g, "");
    return parseFloat(clean) || 0;
  };

  const subtotal = items.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  );
  const giftBoxPrice = includeGiftBox ? 5 : 0;
  const total = subtotal + giftBoxPrice;

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#2D2826] font-sans pb-20">
      <Navbar />

      {/* CHECKOUT STEPS HEADER */}
      <section className="bg-white border-b border-stone-200 py-6 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between text-xs sm:text-sm font-medium text-stone-500">
          <div className="flex items-center gap-2 text-[#A86B6C] font-bold">
            <span className="w-6 h-6 rounded-full bg-[#A86B6C] text-white flex items-center justify-center text-xs">
              1
            </span>
            <span>Troli</span>
          </div>
          <span className="h-px bg-stone-200 flex-1 mx-4"></span>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center text-xs">
              2
            </span>
            <span>Maklumat</span>
          </div>
          <span className="h-px bg-stone-200 flex-1 mx-4"></span>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center text-xs">
              3
            </span>
            <span>Pembayaran</span>
          </div>
          <span className="h-px bg-stone-200 flex-1 mx-4"></span>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center text-xs">
              4
            </span>
            <span>Selesai</span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="font-serif text-3xl font-bold text-[#2D2826] mb-8">
          Troli Saya ({items.reduce((acc, item) => acc + item.quantity, 0)} produk)
        </h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4 shadow-sm">
            <p className="text-stone-600 text-base">Troli anda masih kosong.</p>
            <Link
              href="/shop"
              className="inline-block bg-[#2D2826] text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition"
            >
              Mula Membeli-belah
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            
            {/* SENARAI ITEM DALAM TROLI */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const itemPriceNum = parsePrice(item.price);
                return (
                  <div
                    key={item.id}
                    className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-100 shadow-sm flex gap-4 sm:gap-6 items-center"
                  >
                    <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-xs text-stone-400">
                          Tiada Imej
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <Link href={`/product/${item.slug}`}>
                          <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 hover:text-[#A86B6C] transition">
                            {item.name}
                          </h3>
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-1"
                          aria-label="Padam produk"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-stone-500">Perfume Mist / Standard</p>

                      <div className="flex justify-between items-center pt-2">
                        {/* Kawalan Kuantiti */}
                        <div className="flex items-center border border-stone-200 bg-stone-50 rounded-lg px-2 py-1 gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-stone-700 hover:text-black transition"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-stone-700 hover:text-black transition"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-bold text-stone-900 text-sm sm:text-base">
                          RM {(itemPriceNum * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* PILIHAN KOTAK HADIAH (ADD-ON) */}
              <div className="p-5 rounded-2xl border border-[#A86B6C]/30 bg-[#A86B6C]/5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#A86B6C]/20 flex items-center justify-center text-[#A86B6C] shrink-0">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900">
                      Tambah kotak hadiah (+RM5)
                    </p>
                    <p className="text-xs text-stone-600">
                      Termasuk kotak eksklusif DJAMEELAA & kad ucapan khas.
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeGiftBox}
                    onChange={(e) => setIncludeGiftBox(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#A86B6C]"></div>
                </label>
              </div>
            </div>

            {/* RINGKASAN PESANAN (ORDER SUMMARY) */}
            <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm space-y-6">
              <h2 className="font-serif text-xl font-bold text-stone-900 border-b border-stone-100 pb-4">
                Ringkasan Pesanan
              </h2>

              <div className="space-y-3 text-sm text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">RM {subtotal.toFixed(2)}</span>
                </div>

                {includeGiftBox && (
                  <div className="flex justify-between text-xs text-[#A86B6C] font-medium">
                    <span>Kotak Hadiah Eksklusif</span>
                    <span>+RM 5.00</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Penghantaran</span>
                  <span className="text-xs text-stone-400">
                    Dikira semasa checkout
                  </span>
                </div>

                <div className="border-t border-stone-100 pt-3 flex justify-between text-base font-bold text-stone-900">
                  <span>Jumlah</span>
                  <span>RM {total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  href="/checkout"
                  className="w-full bg-[#2D2826] text-white py-3.5 rounded-full font-medium text-sm hover:bg-stone-800 transition-colors shadow-md flex items-center justify-center gap-2 text-center"
                >
                  <span>Teruskan ke Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/shop"
                  className="block text-center text-xs text-stone-500 hover:text-stone-900 transition-colors py-1"
                >
                  ← Teruskan Membeli-belah
                </Link>
              </div>

              {/* IKON PEMBAYARAN */}
              <div className="border-t border-stone-100 pt-4 space-y-2 text-center">
                <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                  Kami Terima
                </p>
                <div className="flex items-center justify-center gap-3 text-[10px] font-bold text-stone-700">
                  <span className="bg-stone-50 px-2.5 py-1 rounded border border-stone-200">FPX</span>
                  <span className="bg-stone-50 px-2.5 py-1 rounded border border-stone-200">VISA</span>
                  <span className="bg-stone-50 px-2.5 py-1 rounded border border-stone-200">GrabPay</span>
                  <span className="bg-stone-50 px-2.5 py-1 rounded border border-stone-200">Touch 'n Go</span>
                </div>
              </div>
            </div>

          </div>
        )}
      </section>
    </div>
  );
}