'use client';

import Link from 'next/link';
import { Search, User, ShoppingBag } from 'lucide-react';
import { useCart } from '@/store/useCart';

export default function Navbar() {
  // Ambil data items dari Zustand store
  const items = useCart((state) => state.items);
  const setIsOpen = useCart((state) => state.setIsOpen);

  // Kira jumlah kuantiti keseluruhan produk dalam troli
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#F8F5F0]/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo Jenama */}
        <Link href="/shop" className="flex flex-col">
          <span className="text-2xl font-bold tracking-widest text-[#2D2826] font-serif">DJAMEELAA</span>
          <span className="text-[10px] tracking-[0.2em] text-stone-500 uppercase">Scent Your Story</span>
        </Link>

        {/* Menu Navigasi Tengah */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700">
          <Link href="/." className="hover:text-black transition">Utama</Link>
          <Link href="/shop" className="hover:text-black transition">Koleksi</Link>
          <Link href="/about" className="hover:text-black transition">Tentang Kami</Link>
          <Link href="/shop" className="hover:text-black transition">Jurnal</Link>
          <Link href="/track-order" className="hover:text-black transition">Track Order</Link>
        </nav>

        {/* Ikon Kanan (Carian, Akaun, Troli) */}
        <div className="flex items-center gap-5 text-stone-700">
          <button aria-label="Cari" className="hover:text-black transition">
            <Search size={20} />
          </button>
          <Link href="/shop" aria-label="Akaun" className="hover:text-black transition">
            <User size={20} />
          </Link>
          
          {/* Ikon Troli Dinamik */}
          <button 
            onClick={() => setIsOpen(true)}
            className="relative p-1 hover:text-black transition flex items-center"
            aria-label="Troli"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#A86B6C] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {totalItems}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}