"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  Search,
  CheckCircle2,
  Package,
  Truck,
  Check,
  LayoutDashboard,
  ShoppingBag,
  Heart,
  User,
  LogOut,
} from "lucide-react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [hasSearched, setHasSearched] = useState(true); // Set true default for preview

  // Mock status steps: 1 = Pesanan Diterima, 2 = Sedang Diproses, 3 = Dalam Penghantaran, 4 = Selesai
const currentStep: number = 3;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      setHasSearched(true);
    }
  };

  return (
    <div className="min-h-screen bg-brand-beige text-brand-charcoal font-sans pb-20">
      <Navbar />

      {/* TRACK ORDER SECTION */}
      <section className="max-w-4xl mx-auto px-6 pt-12 pb-10">
        <div className="text-center space-y-3 mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-burgundy">
            Track Order
          </h1>
          <p className="text-brand-charcoal/70 text-sm">
            Masukkan nombor pesanan anda untuk semak status penghantaran.
          </p>

          {/* SEARCH FORM */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto pt-4"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Contoh: DJM12345"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full bg-white border border-brand-sand rounded-full px-5 py-3 text-sm focus:outline-none focus:border-brand-burgundy transition-colors text-brand-charcoal"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-brand-burgundy text-brand-beige px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-brand-burgundy/90 transition-colors whitespace-nowrap"
            >
              Semak Status
            </button>
          </form>
        </div>

        {/* STATUS STEPPER TIMELINE */}
        {hasSearched && (
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-brand-sand shadow-sm space-y-8 mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-brand-sand/60 pb-4 gap-2">
              <div>
                <span className="text-xs text-brand-charcoal/60 uppercase font-semibold">
                  Nombor Pesanan
                </span>
                <p className="font-serif text-xl font-bold text-brand-burgundy">
                  #DJM12345
                </p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-brand-charcoal/60 uppercase font-semibold">
                  Jangkaan Tiba
                </span>
                <p className="text-sm font-semibold text-brand-rose">
                  12 Oktober 2026
                </p>
              </div>
            </div>

            {/* STEPPER PROGRESS */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0">
              {/* Line Connector (Desktop) */}
              <div className="hidden md:block absolute top-5 left-12 right-12 h-0.5 bg-brand-sand z-0">
                <div
                  className="h-full bg-brand-burgundy transition-all duration-500"
                  style={{
                    width:
                      currentStep === 1
                        ? "0%"
                        : currentStep === 2
                        ? "33%"
                        : currentStep === 3
                        ? "66%"
                        : "100%",
                  }}
                ></div>
              </div>

              {/* Step 1 */}
              <div className="relative z-10 flex md:flex-col items-center gap-4 md:gap-2 text-left md:text-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${
                    currentStep >= 1
                      ? "bg-brand-burgundy text-brand-beige"
                      : "bg-brand-sand/60 text-brand-charcoal/60"
                  }`}
                >
                  {currentStep > 1 ? <Check className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-burgundy">Pesanan Diterima</p>
                  <p className="text-[10px] text-brand-charcoal/60">9 Oct, 10:30 AM</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex md:flex-col items-center gap-4 md:gap-2 text-left md:text-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${
                    currentStep >= 2
                      ? "bg-brand-burgundy text-brand-beige"
                      : "bg-brand-sand/60 text-brand-charcoal/60"
                  }`}
                >
                  {currentStep > 2 ? <Check className="w-5 h-5" /> : <Package className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-burgundy">Sedang Diproses</p>
                  <p className="text-[10px] text-brand-charcoal/60">9 Oct, 02:15 PM</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex md:flex-col items-center gap-4 md:gap-2 text-left md:text-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${
                    currentStep >= 3
                      ? "bg-brand-burgundy text-brand-beige animate-pulse"
                      : "bg-brand-sand/60 text-brand-charcoal/60"
                  }`}
                >
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-burgundy">Dalam Penghantaran</p>
                  <p className="text-[10px] text-brand-charcoal/60">NinjaVan: NVMY982312</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative z-10 flex md:flex-col items-center gap-4 md:gap-2 text-left md:text-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${
                    currentStep >= 4
                      ? "bg-brand-burgundy text-brand-beige"
                      : "bg-brand-sand/60 text-brand-charcoal/60"
                  }`}
                >
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-burgundy">Selesai</p>
                  <p className="text-[10px] text-brand-charcoal/60">Belum Selesai</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* AKAUN SAYA SECTION */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-brand-sand shadow-sm space-y-6">
          <h2 className="font-serif text-2xl font-bold text-brand-burgundy border-b border-brand-sand/60 pb-4 text-center sm:text-left">
            Akaun Saya
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link
              href="/account/dashboard"
              className="flex items-center gap-3 p-4 rounded-xl border border-brand-sand/80 hover:border-brand-burgundy hover:bg-brand-beige/50 transition-all text-brand-burgundy font-medium text-sm"
            >
              <LayoutDashboard className="w-5 h-5 text-brand-rose" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/account/orders"
              className="flex items-center gap-3 p-4 rounded-xl border border-brand-sand/80 hover:border-brand-burgundy hover:bg-brand-beige/50 transition-all text-brand-burgundy font-medium text-sm"
            >
              <ShoppingBag className="w-5 h-5 text-brand-rose" />
              <span>Pesanan Saya</span>
            </Link>

            <Link
              href="/account/wishlist"
              className="flex items-center gap-3 p-4 rounded-xl border border-brand-sand/80 hover:border-brand-burgundy hover:bg-brand-beige/50 transition-all text-brand-burgundy font-medium text-sm"
            >
              <Heart className="w-5 h-5 text-brand-rose" />
              <span>Wishlist</span>
            </Link>

            <Link
              href="/account/profile"
              className="flex items-center gap-3 p-4 rounded-xl border border-brand-sand/80 hover:border-brand-burgundy hover:bg-brand-beige/50 transition-all text-brand-burgundy font-medium text-sm"
            >
              <User className="w-5 h-5 text-brand-rose" />
              <span>Maklumat Akaun</span>
            </Link>

            <button
              onClick={() => alert("Log keluar dari akaun.")}
              className="flex items-center gap-3 p-4 rounded-xl border border-red-100 bg-red-50/50 hover:bg-red-100/60 transition-all text-red-600 font-medium text-sm text-left"
            >
              <LogOut className="w-5 h-5" />
              <span>Log Keluar</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}