"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Sparkles, ShieldCheck, Heart, Award, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-beige text-brand-charcoal font-sans pb-20">
      <Navbar />

      {/* HERO SECTION */}
      <section className="pt-12 pb-16 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold tracking-[0.2em] text-brand-rose uppercase">
              Kisah Di Sebalik Djameelaa
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-burgundy leading-tight">
              Lebih Dari Sekadar Wangian
            </h1>
            <p className="text-brand-charcoal/80 text-base md:text-lg leading-relaxed">
              Djameelaa lahir daripada kepercayaan bahawa setiap wanita mempunyai ceritanya yang unik. Kami mencipta wangian untuk menemani setiap langkah anda — dalam pekerjaan, keluarga, impian dan setiap detik berharga.
            </p>
            <div>
              <Link
                href="/shop"
                className="inline-flex items-center gap-3 bg-brand-burgundy text-brand-beige px-8 py-3.5 rounded-full font-medium hover:bg-brand-burgundy/90 transition-all text-sm shadow-md"
              >
                <span>Terokai Koleksi Kami</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative h-105 md:h-125 w-full rounded-3xl overflow-hidden shadow-xl border border-brand-sand">
            <Image
              src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1000&auto=format&fit=crop"
              alt="Tentang Djameelaa"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* BRAND VALUES GRID */}
      <section className="bg-white border-y border-brand-sand py-16 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-serif text-3xl font-bold text-brand-burgundy">
              Komitmen Kualiti Djameelaa
            </h2>
            <p className="text-sm text-brand-charcoal/70">
              Setiap botol direka dengan teliti menggunakan pati haruman terbaik untuk ketahanan & keselesaan anda sepanjang hari.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-brand-beige/50 p-6 rounded-2xl border border-brand-sand text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-brand-burgundy text-brand-beige flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-brand-burgundy text-lg">
                Wangian Eksklusif
              </h3>
              <p className="text-xs text-brand-charcoal/70 leading-relaxed">
                Formulasi khas yang memikat dan tidak menyengat hidung.
              </p>
            </div>

            <div className="bg-brand-beige/50 p-6 rounded-2xl border border-brand-sand text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-brand-burgundy text-brand-beige flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-brand-burgundy text-lg">
                Selamat Digunakan
              </h3>
              <p className="text-xs text-brand-charcoal/70 leading-relaxed">
                Bahan premium yang lembut pada kulit dan bebas bahan kimia berbahaya.
              </p>
            </div>

            <div className="bg-brand-beige/50 p-6 rounded-2xl border border-brand-sand text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-brand-burgundy text-brand-beige flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-brand-burgundy text-lg">
                Mesra Muslimah
              </h3>
              <p className="text-xs text-brand-charcoal/70 leading-relaxed">
                Mesra wuduk, suci dan diyakini untuk kegunaan harian.
              </p>
            </div>

            <div className="bg-brand-beige/50 p-6 rounded-2xl border border-brand-sand text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-brand-burgundy text-brand-beige flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-brand-burgundy text-lg">
                Kualiti Premium
              </h3>
              <p className="text-xs text-brand-charcoal/70 leading-relaxed">
                Pembungkusan mewah sesuai dijadikan hadiah untuk yang tersayang.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY CALLOUT */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center space-y-6">
        <span className="font-serif italic text-2xl md:text-3xl text-brand-burgundy">
          &quot;Wangian bukan sekadar apa yang anda pakai, tetapi bagaimana anda ingin diingati.&quot;
        </span>
        <p className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-rose">
          — DJAMEELAA
        </p>
      </section>
    </div>
  );
}