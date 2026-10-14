"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Search, PackageCheck, Clock, CheckCircle2, Truck, AlertCircle, Loader2 } from "lucide-react";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || "";

  const [orderId, setOrderId] = useState(initialId);
  const [inputVal, setInputVal] = useState(initialId);
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrder = async (idToFetch: string) => {
    if (!idToFetch) return;
    setLoading(true);
    setError("");
    setOrderData(null);

    try {
      const res = await fetch(`/api/get-order?id=${idToFetch}`);
      const data = await res.json();

      if (res.ok && !data.error) {
        setOrderData(data);
      } else {
        setError(data.error || "Pesanan tidak dijumpai. Sila semak nombor ID.");
      }
    } catch (err) {
      setError("Gagal menyambung ke pelayan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialId) {
      fetchOrder(initialId);
    }
  }, [initialId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      setOrderId(inputVal.trim());
      fetchOrder(inputVal.trim());
    }
  };

  // Helper untuk terjemah status WooCommerce ke Bahasa Melayu
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5"><Clock size={14}/> Menunggu Bayaran (Pending)</span>;
      case "processing":
        return <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5"><PackageCheck size={14}/> Sedang Diproses (Processing)</span>;
      case "completed":
        return <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5"><CheckCircle2 size={14}/> Selesai / Dihantar (Completed)</span>;
      default:
        return <span className="bg-stone-100 text-stone-700 px-3 py-1 rounded-full text-xs font-semibold">{status}</span>;
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-10 space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm text-center space-y-4">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">Jejak Status Pesanan</h1>
        <p className="text-xs sm:text-sm text-stone-600">Masukkan nombor pesanan anda untuk menyemak status terkini dari sistem.</p>

        <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto pt-2">
          <input
            type="text"
            placeholder="Cth: 25"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 bg-[#F8F5F0] border border-stone-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-stone-400"
          />
          <button type="submit" className="px-6 py-3 bg-[#2D2826] text-white rounded-2xl text-xs font-semibold hover:bg-stone-800 transition flex items-center gap-2">
            <Search size={14} />
            <span>Semak</span>
          </button>
        </form>
      </div>

      {loading && (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-[#A86B6C]" size={32} />
        </div>
      )}

      {error && (
        <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {orderData && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-stone-100 pb-4">
            <div>
              <p className="text-xs text-stone-400">ID Pesanan</p>
              <h2 className="font-mono font-bold text-lg text-stone-900">#{orderData.id}</h2>
            </div>
            <div>{getStatusBadge(orderData.status)}</div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-stone-400">Tarikh:</p>
              <p className="font-semibold text-stone-800">{new Date(orderData.date_created).toLocaleDateString("ms-MY")}</p>
            </div>
            <div>
              <p className="text-stone-400">Kaedah Pembayaran:</p>
              <p className="font-semibold text-stone-800">{orderData.payment_method_title}</p>
            </div>
            <div className="col-span-2">
              <p className="text-stone-400">Penerima & Alamat:</p>
              <p className="font-semibold text-stone-800">{orderData.billing.first_name} {orderData.billing.last_name} ({orderData.billing.phone})</p>
              <p className="text-stone-600">{orderData.billing.address_1}, {orderData.billing.postcode} {orderData.billing.city}, {orderData.billing.state}</p>
            </div>
          </div>

          <div className="border-t border-stone-100 pt-4 space-y-2">
            <p className="text-xs font-semibold text-stone-800">Senarai Produk:</p>
            {orderData.line_items.map((item: any) => (
              <div key={item.id} className="flex justify-between text-xs py-1 border-b border-stone-50">
                <span>{item.name} (x{item.quantity})</span>
                <span className="font-semibold">RM {item.total}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-sm pt-2 text-stone-900">
              <span>Jumlah Keseluruhan:</span>
              <span className="text-[#A86B6C]">RM {orderData.total}</span>
            </div>
          </div>

          <div className="pt-2">
            <Link href="/shop" className="block text-center w-full py-3 bg-stone-100 text-stone-800 rounded-2xl text-xs font-semibold hover:bg-stone-200 transition">
              Kembali ke Kedai
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#2D2826] font-sans pb-20">
      <Navbar />
      <Suspense fallback={<div className="text-center py-20 text-xs text-stone-500">Memuatkan...</div>}>
        <TrackOrderContent />
      </Suspense>
    </div>
  );
}