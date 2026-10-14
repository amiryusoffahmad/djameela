'use client';

import { useCart } from '@/store/useCart';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity } = useCart();

  if (!isOpen) return null;

  const parsePrice = (priceStr: string) => {
    if (!priceStr) return 0;
    const clean = priceStr.replace(/[^0-9.]/g, '');
    return parseFloat(clean) || 0;
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = items.reduce((total, item) => {
    return total + parsePrice(item.price) * item.quantity;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Overlay Gelap */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F5F0] text-[#2D2826] shadow-2xl flex flex-col border-l border-stone-200">
          
          {/* HEADER DRAWER */}
          <div className="flex items-center justify-between px-6 py-5 bg-white border-b border-stone-200/80">
            <div className="flex items-center gap-2.5 font-serif text-lg font-bold text-[#2D2826]">
              <ShoppingBag size={20} className="text-[#A86B6C]" /> 
              <span>Troli Belanja ({totalItems})</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 text-stone-400 hover:text-stone-900 transition rounded-full hover:bg-stone-100"
              aria-label="Tutup"
            >
              <X size={20} />
            </button>
          </div>

          {/* SENARAI ITEM */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20 text-stone-500 space-y-3">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
                  <ShoppingBag size={28} />
                </div>
                <p className="font-medium text-stone-700">Troli anda masih kosong.</p>
                <p className="text-xs text-stone-400">Jom pilih haruman eksklusif DJAMEELAA!</p>
              </div>
            ) : (
              items.map((item) => {
                const itemPriceNum = parsePrice(item.price);
                return (
                  <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-white border border-stone-200/80 shadow-sm items-center">
                    <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-100">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-[10px] text-stone-400">Tiada Imej</div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-serif font-bold text-sm text-stone-900 truncate">{item.name}</h4>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-stone-400 hover:text-red-600 transition p-1"
                          title="Padam"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <p className="text-xs font-bold text-[#A86B6C]">
                        RM {itemPriceNum.toFixed(2)}
                      </p>
                      
                      {/* Kawalan Kuantiti */}
                      <div className="flex items-center gap-2 pt-1">
                        <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 overflow-hidden px-1 py-0.5">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-stone-600 hover:text-black transition"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-stone-800">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-stone-600 hover:text-black transition"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* FOOTER & BUTTON CHECKOUT */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-white space-y-4 shadow-lg">
              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex justify-between items-center text-sm font-semibold text-stone-900">
                  <span>Anggaran Jumlah:</span>
                  <span className="text-lg font-bold text-[#A86B6C]">RM {totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-[11px] text-stone-400">Cukai & kos penghantaran dikira semasa checkout.</p>
              </div>

              <div className="space-y-2 pt-1">
                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3.5 bg-[#2D2826] text-white rounded-2xl font-medium text-xs hover:bg-stone-800 transition flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Lihat Troli Lengkap</span>
                  <ArrowRight size={15} />
                </Link>

                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 bg-stone-100 text-stone-800 rounded-2xl font-semibold text-xs hover:bg-stone-200 transition text-center block border border-stone-200"
                >
                  Teruskan ke Pembayaran
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}