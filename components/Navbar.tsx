"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Search, Menu, X, User } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Utama", href: "/" },
    { name: "Koleksi", href: "/shop" },
    { name: "Tentang Kami", href: "/about" },
    { name: "Jurnal", href: "/blog" },
    { name: "Track Order", href: "/track-order" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-brand-beige/95 backdrop-blur-md border-b border-brand-sand">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* BRAND LOGO */}
        <Link href="/" className="flex flex-col items-start">
          <span className="font-serif text-2xl font-bold tracking-widest text-brand-burgundy uppercase">
            DJAMEELAA
          </span>
          <span className="text-[9px] tracking-[0.25em] text-brand-rose font-medium uppercase -mt-1">
            Scent Your Story
          </span>
        </Link>

        {/* DESKTOP NAVIGATION LINKS */}
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-brand-charcoal/80">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-brand-burgundy transition-colors py-1"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* ACTION ICONS (Search, Account, Cart, Mobile Toggle) */}
        <div className="flex items-center gap-4 sm:gap-5 text-brand-burgundy">
          <button
            aria-label="Cari"
            className="p-1.5 hover:text-brand-rose transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          <Link
            href="/track-order"
            aria-label="Akaun Saya"
            className="p-1.5 hover:text-brand-rose transition-colors hidden sm:block"
          >
            <User className="w-5 h-5" />
          </Link>

          <Link
            href="/cart"
            aria-label="Troli"
            className="p-1.5 hover:text-brand-rose transition-colors relative"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-brand-burgundy text-brand-beige text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              2
            </span>
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 text-brand-burgundy"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-beige border-b border-brand-sand px-6 py-6 space-y-4 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-semibold uppercase tracking-wider text-brand-burgundy hover:text-brand-rose transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-brand-sand flex justify-between items-center text-xs text-brand-charcoal/70">
            <Link
              href="/track-order"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-semibold text-brand-burgundy"
            >
              Akaun Saya / Semak Status
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}