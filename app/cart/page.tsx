"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Trash2, Plus, Minus, ArrowRight, Gift, Check, ShieldCheck } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Embun Sence",
      variant: "100ml",
      price: 129,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "2",
      name: "Travel Size Set",
      variant: "5ml x 3",
      price: 39,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=600&auto=format&fit=crop",
    },
  ]);

  const [includeGiftBox, setIncludeGiftBox] = useState(false);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const giftBoxPrice = includeGiftBox ? 5 : 0;
  const total = subtotal + giftBoxPrice;

  return (
    <div className="min-h-screen bg-brand-beige text-brand-charcoal font-sans pb-20">
      <Navbar />

      {/* CHECKOUT STEPS HEADER */}
      <section className="bg-white border-b border-brand-sand py-6 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between text-xs sm:text-sm font-medium text-brand-charcoal/60">
          <div className="flex items-center gap-2 text-brand-burgundy font-bold">
            <span className="w-6 h-6 rounded-full bg-brand-burgundy text-brand-beige flex items-center justify-center text-xs">
              1
            </span>
            <span>Troli</span>
          </div>
          <span className="h-px bg-brand-sand flex-1 mx-4"></span>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-sand/60 text-brand-charcoal/70 flex items-center justify-center text-xs">
              2
            </span>
            <span>Maklumat</span>
          </div>
          <span className="h-px bg-brand-sand flex-1 mx-4"></span>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-sand/60 text-brand-charcoal/70 flex items-center justify-center text-xs">
              3
            </span>
            <span>Pembayaran</span>
          </div>
          <span className="h-px bg-brand-sand flex-1 mx-4"></span>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-sand/60 text-brand-charcoal/70 flex items-center justify-center text-xs">
              4
            </span>
            <span>Selesai</span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="font-serif text-3xl font-bold text-brand-burgundy mb-8">
          Troli Saya ({cartItems.length} produk)
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-brand-sand space-y-4">
            <p className="text-brand-charcoal/70 text-base">Troli anda masih kosong.</p>
            <Link
              href="/shop"
              className="inline-block bg-brand-burgundy text-brand-beige px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider"
            >
              Mula Membeli-belah
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            {/* ITEM LIST */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-brand-sand shadow-sm flex gap-4 sm:gap-6 items-center"
                >
                  <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-xl overflow-hidden bg-brand-beige shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-serif text-base sm:text-lg font-bold text-brand-burgundy">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-brand-charcoal/40 hover:text-red-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-brand-charcoal/60">{item.variant}</p>

                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center border border-brand-sand bg-brand-beige/50 rounded-lg px-2 py-1 gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-brand-burgundy hover:opacity-75"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-brand-burgundy hover:opacity-75"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-bold text-brand-burgundy text-sm sm:text-base">
                        RM{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* GIFT BOX ADD-ON OPTION */}
              <div className="p-5 rounded-2xl border border-brand-rose/40 bg-brand-rose/5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-rose/20 flex items-center justify-center text-brand-burgundy shrink-0">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-burgundy">
                      Tambah kotak hadiah (+RM5)
                    </p>
                    <p className="text-xs text-brand-charcoal/70">
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
                  <div className="w-11 h-6 bg-brand-sand peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-burgundy"></div>
                </label>
              </div>
            </div>

            {/* ORDER SUMMARY */}
            <div className="bg-white p-6 rounded-2xl border border-brand-sand shadow-sm space-y-6">
              <h2 className="font-serif text-xl font-bold text-brand-burgundy border-b border-brand-sand/60 pb-4">
                Ringkasan Pesanan
              </h2>

              <div className="space-y-3 text-sm text-brand-charcoal/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-brand-burgundy">RM{subtotal}</span>
                </div>

                {includeGiftBox && (
                  <div className="flex justify-between text-xs text-brand-rose font-medium">
                    <span>Kotak Hadiah Eksklusif</span>
                    <span>+RM5</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Penghantaran</span>
                  <span className="text-xs text-brand-charcoal/60">
                    Dikira semasa checkout
                  </span>
                </div>

                <div className="border-t border-brand-sand/60 pt-3 flex justify-between text-base font-bold text-brand-burgundy">
                  <span>Jumlah</span>
                  <span>RM{total}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button className="w-full bg-brand-burgundy text-brand-beige py-3.5 rounded-full font-medium text-sm hover:bg-brand-burgundy/90 transition-colors shadow-md flex items-center justify-center gap-2">
                  <span>Teruskan ke Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  href="/shop"
                  className="block text-center text-xs text-brand-charcoal/70 hover:text-brand-burgundy transition-colors py-1"
                >
                  ← Teruskan Membeli-belah
                </Link>
              </div>

              {/* PAYMENT ICONS */}
              <div className="border-t border-brand-sand/60 pt-4 space-y-2 text-center">
                <p className="text-[11px] font-semibold text-brand-charcoal/60 uppercase tracking-wider">
                  Kami Terima
                </p>
                <div className="flex items-center justify-center gap-3 text-[10px] font-bold text-brand-burgundy/80">
                  <span className="bg-brand-beige px-2.5 py-1 rounded border border-brand-sand">FPX</span>
                  <span className="bg-brand-beige px-2.5 py-1 rounded border border-brand-sand">VISA</span>
                  <span className="bg-brand-beige px-2.5 py-1 rounded border border-brand-sand">GrabPay</span>
                  <span className="bg-brand-beige px-2.5 py-1 rounded border border-brand-sand">Touch 'n Go</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}