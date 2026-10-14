import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/lib/woocommerce";
import Navbar from "@/components/Navbar";
import AddToCartButton from "@/components/AddToCartButton";
import { 
  Star, 
  Clock, 
  Sparkles, 
  HeartHandshake, 
  Package, 
  Truck, 
  CreditCard, 
  ShieldCheck 
} from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = (await getProductBySlug(slug)) as any;

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F8F5F0] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-serif font-bold text-[#2D2826] mb-2">Produk Tidak Ditemui</h1>
        <p className="text-stone-600 mb-6 text-sm">Maaf, produk yang anda cari tidak wujud atau telah dipadam.</p>
        <Link href="/shop" className="px-6 py-3 bg-[#2D2826] text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition">
          Kembali ke Koleksi
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#2D2826]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* BREADCRUMBS */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <Link href="/shop" className="hover:text-black transition">Home</Link>
          <span>&gt;</span>
          <Link href="/shop" className="hover:text-black transition">Produk</Link>
          <span>&gt;</span>
          <span className="text-stone-800 font-medium">{product.name}</span>
        </div>

        {/* MAIN PRODUCT SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 bg-white p-6 md:p-10 rounded-3xl border border-stone-100 shadow-sm">
          
          {/* BAHAGIAN GAMBAR & THUMBNAILS */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-stone-100">
              {product.image?.sourceUrl ? (
                <Image
                  src={product.image.sourceUrl}
                  alt={product.image.altText || product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full text-stone-400 text-xs">Tiada Imej</div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className={`relative aspect-square rounded-xl overflow-hidden bg-stone-100 border cursor-pointer transition ${
                    i === 1 ? "border-[#A86B6C]" : "border-stone-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  {product.image?.sourceUrl && (
                    <Image src={product.image.sourceUrl} alt="Thumbnail" fill className="object-cover" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* BAHAGIAN MAKLUMAT PRODUK */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-1">
                {product.name}
              </h1>
              <p className="text-xs text-stone-500 mb-3">Perfume Mist | 100ml</p>
              
              {/* Harga */}
              <div 
                className="text-2xl font-bold text-[#A86B6C] mb-2" 
                dangerouslySetInnerHTML={{ __html: product.price || "RM129" }} 
              />

              {/* Rating */}
              <div className="flex items-center gap-1 text-xs text-stone-500 mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                </div>
                <span className="font-medium text-stone-700">(128 ulasan)</span>
              </div>

              {/* Penerangan Ringkas */}
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6">
                Wangian lembut dan menyegarkan, dicipta untuk wanita yang mahu tampil yakin, anggun dan memikat dalam setiap langkah.
              </p>

              {/* Ciri-ciri Cepat (Bullets dengan Ikon) */}
              <div className="space-y-2.5 py-4 border-y border-stone-100 mb-6 text-xs text-stone-700">
                <div className="flex items-center gap-2.5">
                  <Clock size={16} className="text-[#A86B6C] shrink-0" />
                  <span>Tahan lama</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Sparkles size={16} className="text-[#A86B6C] shrink-0" />
                  <span>Wangian eksklusif</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <HeartHandshake size={16} className="text-[#A86B6C] shrink-0" />
                  <span>Sesuai untuk harian & majlis khas</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Package size={16} className="text-[#A86B6C] shrink-0" />
                  <span>Mudah dibawa ke mana-mana</span>
                </div>
              </div>
            </div>

            {/* BUTTONS ACTION & TRUST BADGES */}
            <div className="space-y-4 pt-2">
              <AddToCartButton product={product} />

              <Link
                href="/cart"
                className="w-full py-3.5 bg-stone-100 text-[#2D2826] rounded-2xl text-xs font-semibold hover:bg-stone-200 transition text-center block border border-stone-200 shadow-sm"
              >
                Beli Sekarang
              </Link>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-stone-100 text-[10px] text-stone-500 text-center">
                <div className="flex flex-col items-center gap-1">
                  <Truck size={16} className="text-[#A86B6C]" />
                  <span>Penghantaran seluruh Malaysia</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <CreditCard size={16} className="text-[#A86B6C]" />
                  <span>Pembayaran selamat (FPX, Kad, eWallet)</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck size={16} className="text-[#A86B6C]" />
                  <span>Jaminan produk original</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* TAB MAKLUMAT TAMBAHAN BAWAH */}
        <div className="mt-10 bg-white rounded-3xl p-6 sm:p-8 border border-stone-100 shadow-sm">
          <div className="flex gap-6 sm:gap-8 border-b border-stone-100 pb-4 text-xs sm:text-sm font-semibold text-stone-400 overflow-x-auto scrollbar-none">
            <button className="text-stone-900 border-b-2 border-[#A86B6C] pb-1 whitespace-nowrap">Tentang Produk</button>
            <button className="hover:text-stone-900 transition pb-1 whitespace-nowrap">Cara Penggunaan</button>
            <button className="hover:text-stone-900 transition pb-1 whitespace-nowrap">Bahan-Bahan</button>
            <button className="hover:text-stone-900 transition pb-1 whitespace-nowrap">Ulasan (128)</button>
          </div>
          <div className="pt-6 text-xs sm:text-sm text-stone-600 leading-relaxed space-y-3">
            <p>
              <strong className="text-stone-800">{product.name}</strong> ialah perfume mist yang direka khas dengan haruman feminin yang lembut, segar dan memikat. Sesuai digunakan setiap hari, sama ada di pejabat, majlis atau ketika santai.
            </p>
            {product.description && (
              <div 
                className="prose prose-sm text-stone-600"
                dangerouslySetInnerHTML={{ __html: product.description }} 
              />
            )}
          </div>
        </div>

      </main>
    </div>
  );
}