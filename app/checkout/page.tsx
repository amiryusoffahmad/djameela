"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // 1. Import router untuk redirect
import Navbar from "@/components/Navbar";
import { useCart } from "@/store/useCart";
import { 
  ShieldCheck, 
  Lock, 
  Truck, 
  CreditCard, 
  Building2, 
  Wallet, 
  CheckCircle2, 
  ArrowLeft 
} from "lucide-react";

export default function CheckoutPage() {
  const { items, clearCart } = useCart(); // Tambah clearCart jika ada dalam store, atau kosongkan manual
  const router = useRouter();

  // State untuk borang penghantaran
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
    state: "Selangor",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"fpx" | "card" | "ewallet">("fpx");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper untuk tukar harga string ke number
  const parsePrice = (priceStr: string) => {
    if (!priceStr) return 0;
    const clean = priceStr.replace(/[^0-9.]/g, "");
    return parseFloat(clean) || 0;
  };

  const subtotal = items.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  );

  const shippingFee = subtotal > 0 ? 8.00 : 0.00;
  const totalAmount = subtotal + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, items, paymentMethod }),
      });

      const data = await response.json();

      if (data.success) {
        // Kosongkan troli
        if (typeof clearCart === "function") {
          clearCart();
        }
        // Redirect ke halaman success membawa ID sebenar dari WooCommerce (Cth: 105)
        router.push(`/order-success?order_id=${data.orderId}`);
      } else {
        alert("Ralat: " + data.error);
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      alert("Gagal berhubung dengan pelayan.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#2D2826] font-sans pb-20">
      <Navbar />

      {/* STEPS HEADER */}
      <section className="bg-white border-b border-stone-200 py-6 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between text-xs sm:text-sm font-medium text-stone-500">
          <Link href="/cart" className="flex items-center gap-2 text-[#A86B6C] font-bold">
            <span className="w-6 h-6 rounded-full bg-[#A86B6C] text-white flex items-center justify-center text-xs">
              1
            </span>
            <span>Troli</span>
          </Link>
          <span className="h-px bg-stone-200 flex-1 mx-4"></span>
          <div className="flex items-center gap-2 text-[#A86B6C] font-bold">
            <span className="w-6 h-6 rounded-full bg-[#A86B6C] text-white flex items-center justify-center text-xs">
              2
            </span>
            <span>Maklumat</span>
          </div>
          <span className="h-px bg-stone-200 flex-1 mx-4"></span>
          <div className="flex items-center gap-2 text-stone-400">
            <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center text-xs">
              3
            </span>
            <span>Pembayaran</span>
          </div>
          <span className="h-px bg-stone-200 flex-1 mx-4"></span>
          <div className="flex items-center gap-2 text-stone-400">
            <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center text-xs">
              4
            </span>
            <span>Selesai</span>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/cart" className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-black transition">
            <ArrowLeft size={16} /> Kembali ke Troli
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <Lock size={14} />
            <span>Pembayaran Selamat 256-bit SSL</span>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4 shadow-sm max-w-xl mx-auto">
            <p className="text-stone-600 text-base">Tiada produk untuk dicartakan.</p>
            <Link
              href="/shop"
              className="inline-block bg-[#2D2826] text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition"
            >
              Kembali ke Koleksi
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder} className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* RUANGAN BORANG MAKLUMAT (KIRI) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 1. MAKLUMAT PELANGGAN & PENGHANTARAN */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-100 shadow-sm space-y-6">
                <h2 className="font-serif text-xl font-bold text-stone-900 border-b border-stone-100 pb-4 flex items-center gap-2">
                  <Truck className="text-[#A86B6C]" size={22} />
                  Maklumat Penghantaran
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">Nama Pertama *</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Cth: Aisyah"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#A86B6C] bg-stone-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">Nama Akhir *</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Cth: Ahmad"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#A86B6C] bg-stone-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">E-mel *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="nama@email.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#A86B6C] bg-stone-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">No. Telefon / WhatsApp *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="0123456789"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#A86B6C] bg-stone-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">Alamat Jalan / Rumah *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="No. 123, Jalan Bunga Rose, Taman Perdana"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#A86B6C] bg-stone-50/50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">Bandar *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Shah Alam"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#A86B6C] bg-stone-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">Poskod *</label>
                    <input
                      type="text"
                      name="postcode"
                      required
                      value={formData.postcode}
                      onChange={handleInputChange}
                      placeholder="40150"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#A86B6C] bg-stone-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">Negeri *</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#A86B6C] bg-stone-50/50"
                    >
                      <option value="Johor">Johor</option>
                      <option value="Kedah">Kedah</option>
                      <option value="Kelantan">Kelantan</option>
                      <option value="Melaka">Melaka</option>
                      <option value="Negeri Sembilan">Negeri Sembilan</option>
                      <option value="Pahang">Pahang</option>
                      <option value="Perak">Perak</option>
                      <option value="Perlis">Perlis</option>
                      <option value="Pulau Pinang">Pulau Pinang</option>
                      <option value="Sabah">Sabah</option>
                      <option value="Sarawak">Sarawak</option>
                      <option value="Selangor">Selangor</option>
                      <option value="Terengganu">Terengganu</option>
                      <option value="W.P. Kuala Lumpur">W.P. Kuala Lumpur</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">Nota Pesanan (Pilihan)</label>
                  <textarea
                    name="notes"
                    rows={2}
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Arahan khas untuk kurier atau ucapan kad hadiah..."
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#A86B6C] bg-stone-50/50"
                  />
                </div>
              </div>

              {/* 2. KAEDAH PEMBAYARAN */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-100 shadow-sm space-y-4">
                <h2 className="font-serif text-xl font-bold text-stone-900 border-b border-stone-100 pb-4 flex items-center gap-2">
                  <CreditCard className="text-[#A86B6C]" size={22} />
                  Pilih Kaedah Pembayaran
                </h2>

                <div className="space-y-3">
                  {/* FPX Option */}
                  <label
                    onClick={() => setPaymentMethod("fpx")}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition ${
                      paymentMethod === "fpx"
                        ? "border-[#A86B6C] bg-[#A86B6C]/5 shadow-sm"
                        : "border-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-700">
                        <Building2 size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-900">FPX Online Banking (Simulasi)</p>
                        <p className="text-[11px] text-stone-500">Maybank2u, CIMB Clicks, Bank Islam, RHB, dll.</p>
                      </div>
                    </div>
                    {paymentMethod === "fpx" && <CheckCircle2 className="text-[#A86B6C]" size={20} />}
                  </label>

                  {/* Kad Kredit/Debit Option */}
                  <label
                    onClick={() => setPaymentMethod("card")}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition ${
                      paymentMethod === "card"
                        ? "border-[#A86B6C] bg-[#A86B6C]/5 shadow-sm"
                        : "border-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-700">
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-900">Kad Kredit / Debit</p>
                        <p className="text-[11px] text-stone-500">Visa & Mastercard tempatan atau antarabangsa</p>
                      </div>
                    </div>
                    {paymentMethod === "card" && <CheckCircle2 className="text-[#A86B6C]" size={20} />}
                  </label>

                  {/* E-Wallet Option */}
                  <label
                    onClick={() => setPaymentMethod("ewallet")}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition ${
                      paymentMethod === "ewallet"
                        ? "border-[#A86B6C] bg-[#A86B6C]/5 shadow-sm"
                        : "border-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-700">
                        <Wallet size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-900">E-Wallet</p>
                        <p className="text-[11px] text-stone-500">Touch &apos;n Go eWallet, GrabPay, ShopeePay</p>
                      </div>
                    </div>
                    {paymentMethod === "ewallet" && <CheckCircle2 className="text-[#A86B6C]" size={20} />}
                  </label>
                </div>
              </div>

            </div>

            {/* RINGKASAN PESANAN (KANAN) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-100 shadow-sm space-y-6">
                <h2 className="font-serif text-xl font-bold text-stone-900 border-b border-stone-100 pb-4">
                  Ringkasan Pesanan ({items.reduce((acc, item) => acc + item.quantity, 0)})
                </h2>

                {/* Senarai Produk Ringkas */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1 scrollbar-none">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 text-xs border-b border-stone-50 pb-2.5">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-12 h-12 rounded-lg bg-stone-100 overflow-hidden shrink-0 border border-stone-100">
                          {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                        </div>
                        <div className="truncate">
                          <p className="font-bold text-stone-900 truncate">{item.name}</p>
                          <p className="text-stone-400">Kuantiti: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-stone-900 shrink-0">
                        RM {(parsePrice(item.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pengiraan Kos */}
                <div className="space-y-2.5 text-xs text-stone-600 border-t border-stone-100 pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-stone-900">RM {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Penghantaran (Semenanjung)</span>
                    <span className="font-semibold text-stone-900">RM {shippingFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-stone-100 pt-3 flex justify-between text-base font-bold text-stone-900">
                    <span>Jumlah Keseluruhan</span>
                    <span className="text-[#A86B6C]">RM {totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                {/* Butang Bayar */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#2D2826] text-white rounded-2xl font-bold text-xs uppercase tracking-wider hover:bg-stone-800 transition shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? "Sedang Memproses..." : `Bayar Sekarang (RM ${totalAmount.toFixed(2)})`}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400 text-center pt-2">
                  <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                  <span>Jaminan transaksi selamat & enkripsi SSL</span>
                </div>
              </div>
            </div>

          </form>
        )}
      </main>
    </div>
  );
}