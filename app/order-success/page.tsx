"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { CheckCircle2, ShoppingBag, Truck, Copy, Loader2 } from "lucide-react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  // Menyokong parameter order_id atau id daripada URL
  const orderId = searchParams.get("order_id") || searchParams.get("id"); 
  
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      setError("Nombor pesanan tidak dijumpai pada URL.");
      return;
    }

    // Tarik data sebenar secara langsung dari WooCommerce melalui API route
    fetch(`/api/get-order?id=${orderId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error && !data.message) {
          setOrderDetails({
            orderId: data.id,
            date: new Date(data.date_created).toLocaleDateString("ms-MY", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
            customerName: `${data.billing.first_name} ${data.billing.last_name}`,
            email: data.billing.email,
            phone: data.billing.phone,
            shippingAddress: `${data.billing.address_1}, ${data.billing.postcode} ${data.billing.city}, ${data.billing.state}`,
            paymentMethod: data.payment_method_title || "Pindahan Bank Manual (BACS)",
            items: data.line_items.map((item: any) => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              price: parseFloat(item.total) / (item.quantity || 1),
            })),
            subtotal: parseFloat(data.total) - parseFloat(data.shipping_total || 0),
            shippingFee: parseFloat(data.shipping_total || 0),
            total: parseFloat(data.total),
          });
        } else {
          setError(data.error || "Gagal memuatkan maklumat pesanan dari WooCommerce.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Ralat sambungan ke pelayan.");
        setLoading(false);
      });
  }, [orderId]);

  const copyOrderId = () => {
    if (orderId) {
      navigator.clipboard.writeText(String(orderId));
      alert("Nombor pesanan disalin!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-stone-500 gap-3">
        <Loader2 className="animate-spin text-[#A86B6C]" size={32} />
        <p className="text-xs">Memuatkan butiran pesanan sebenar dari WooCommerce...</p>
      </div>
    );
  }

  if (error || !orderDetails) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 gap-3">
        <h2 className="text-xl font-bold text-stone-800">Pesanan Tidak Ditemui</h2>
        <p className="text-xs text-stone-500">{error || "Sila semak semula nombor pesanan anda."}</p>
        <Link href="/shop" className="mt-4 px-6 py-3 bg-[#2D2826] text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition">
          Kembali ke Koleksi
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* KOTAK STATUS UCAPAN */}
      <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm text-center space-y-4">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
          <CheckCircle2 size={36} />
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
          Pesanan Berjaya Dicipta!
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
          Terima kasih kerana membeli-belah dengan <strong className="text-stone-800">DJAMEELAA</strong>. Rekod telah berjaya disimpan ke sistem kami.
        </p>

        <div className="inline-flex items-center gap-3 bg-[#F8F5F0] px-5 py-2.5 rounded-2xl border border-stone-200/80 text-xs mt-2">
          <span className="text-stone-500">No. Pesanan:</span>
          <span className="font-mono font-bold text-stone-900 text-sm tracking-wider">#{orderDetails.orderId}</span>
          <button onClick={copyOrderId} className="text-stone-400 hover:text-stone-800 transition p-1" title="Salin ID">
            <Copy size={14} />
          </button>
        </div>
      </div>

      {/* RINGKASAN RESIT */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-100 shadow-sm space-y-6">
        <h2 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
          Butiran Pesanan
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600">
          <div>
            <p className="text-stone-400">Tarikh Pesanan:</p>
            <p className="font-semibold text-stone-800">{orderDetails.date}</p>
          </div>
          <div>
            <p className="text-stone-400">Kaedah Pembayaran:</p>
            <p className="font-semibold text-stone-800">{orderDetails.paymentMethod}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-stone-400">Alamat Penghantaran:</p>
            <p className="font-semibold text-stone-800">{orderDetails.customerName} ({orderDetails.phone})</p>
            <p className="text-stone-600">{orderDetails.shippingAddress}</p>
          </div>
        </div>

        <div className="border-t border-stone-100 pt-4 space-y-3">
          <p className="text-xs font-semibold text-stone-800">Item Dibeli:</p>
          {orderDetails.items.map((item: any) => (
            <div key={item.id} className="flex justify-between items-center text-xs py-1 border-b border-stone-50">
              <div>
                <p className="font-bold text-stone-900">{item.name}</p>
                <p className="text-stone-400">Kuantiti: {item.quantity}</p>
              </div>
              <span className="font-semibold text-stone-900">RM {(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="space-y-2 text-xs text-stone-600 border-t border-stone-100 pt-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-stone-900">RM {orderDetails.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Penghantaran</span>
            <span className="font-semibold text-stone-900">RM {orderDetails.shippingFee.toFixed(2)}</span>
          </div>
          <div className="border-t border-stone-100 pt-3 flex justify-between text-base font-bold text-stone-900">
            <span>Jumlah Dibayar</span>
            <span className="text-[#A86B6C]">RM {orderDetails.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href={`/track-order?id=${orderDetails.orderId}`} className="flex-1 py-3.5 bg-[#2D2826] text-white rounded-2xl font-semibold text-xs text-center hover:bg-stone-800 transition shadow-md flex items-center justify-center gap-2">
          <Truck size={16} />
          <span>Jejak Status Penghantaran</span>
        </Link>
        <Link href="/shop" className="flex-1 py-3.5 bg-white text-stone-800 rounded-2xl font-semibold text-xs text-center border border-stone-200 hover:bg-stone-50 transition flex items-center justify-center gap-2">
          <ShoppingBag size={16} />
          <span>Teruskan Membeli-belah</span>
        </Link>
      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#2D2826] font-sans pb-20">
      <Navbar />
      <Suspense fallback={<div className="text-center py-20 text-xs text-stone-500">Memuatkan resit...</div>}>
        <OrderSuccessContent />
      </Suspense>
    </div>
  );
}