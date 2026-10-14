import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Sparkles, ShieldCheck, Truck, CreditCard, ArrowRight } from "lucide-react";
import { fetchGraphQL } from "@/lib/woocommerce";
export const dynamic = 'force-dynamic';
// Query GraphQL yang lebih selamat (mengelakkan ralat jika produk tiada imej)
const GET_HOME_PRODUCTS = `
  query GetHomeProducts {
    products(first: 3) {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

export default async function Home() {
  let products = [];
  try {
    // Tambah 'as any' di sini supaya TypeScript kenal struktur data GraphQL
    const data = (await fetchGraphQL(GET_HOME_PRODUCTS)) as any;
    products = data?.products?.nodes || [];
  } catch (error) {
    console.error("Gagal menarik produk untuk homepage:", error);
  }

  return (
    <div className="min-h-screen bg-brand-beige text-brand-charcoal font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative bg-[#EFE8E1] py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-burgundy font-bold leading-tight">
              Wangian Yang Menemani Setiap Cerita Hidupmu
            </h1>
            <p className="text-brand-charcoal/80 text-base md:text-lg max-w-lg leading-relaxed">
              Satu semburan, seribu rasa. Djameelaa, lebih dari sekadar wangian.
            </p>
            <div>
              <Link
                href="/shop"
                className="inline-flex items-center gap-3 bg-brand-burgundy text-brand-beige px-8 py-4 rounded-full font-medium hover:bg-brand-burgundy/90 transition-all shadow-md hover:gap-4"
              >
                <span>BELI SEKARANG</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative h-100 md:h-125 w-full rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1200&auto=format&fit=crop"
              alt="Djameelaa Hero"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION BAR */}
      <section className="border-y border-brand-sand bg-white py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Sparkles className="w-6 h-6 text-brand-burgundy" />
            <span className="font-medium text-sm text-brand-burgundy">Wangian Eksklusif & Tahan Lama</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-brand-burgundy" />
            <span className="font-medium text-sm text-brand-burgundy">Bahan Premium Selamat Digunakan</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Truck className="w-6 h-6 text-brand-burgundy" />
            <span className="font-medium text-sm text-brand-burgundy">Penghantaran Seluruh Malaysia</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CreditCard className="w-6 h-6 text-brand-burgundy" />
            <span className="font-medium text-sm text-brand-burgundy">Pembayaran Selamat & Mudah</span>
          </div>
        </div>
      </section>

      {/* KOLEKSI PILIHAN */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-burgundy font-bold">
            Koleksi Pilihan
          </h2>
          <p className="text-brand-charcoal/70 text-sm">
            Wangian untuk setiap suasana dan personaliti.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((product: any) => (
              <div 
                key={product.databaseId || product.id} 
                className="bg-white p-6 rounded-2xl border border-brand-sand shadow-sm space-y-4 text-center flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-64 w-full rounded-xl overflow-hidden bg-brand-beige mb-4">
                    {product.image?.sourceUrl ? (
                      <Image
                        src={product.image.sourceUrl}
                        alt={product.image.altText || product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-stone-400 text-xs">Tiada Imej</div>
                    )}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-brand-burgundy">{product.name}</h3>
                  <div 
                    className="text-brand-rose font-bold mt-1"
                    dangerouslySetInnerHTML={{ __html: product.price || "" }}
                  />
                </div>
                
                <Link
                  href={`/product/${product.slug}`}
                  className="block w-full border border-brand-burgundy text-brand-burgundy py-2.5 rounded-full text-sm font-medium hover:bg-brand-burgundy hover:text-brand-beige transition-colors"
                >
                  Lihat Produk
                </Link>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center text-stone-500 text-sm py-10">
              Tiada produk dijumpai. Sila pastikan produk telah diterbitkan di WooCommerce.
            </p>
          )}
        </div>
      </section>

      {/* CALLOUT BANNER */}
      <section className="bg-brand-rose/20 py-16 px-6 text-center space-y-6">
        <h2 className="font-serif text-3xl md:text-4xl text-brand-burgundy font-bold">
          Lebih Dari Sekadar Wangian
        </h2>
        <p className="text-brand-charcoal/80 max-w-xl mx-auto">
          Ia adalah rasa, memori dan keyakinan.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-brand-burgundy text-brand-beige px-8 py-3.5 rounded-full font-medium hover:bg-brand-burgundy/90 transition-colors"
        >
          TEROKAI KOLEKSI →
        </Link>
      </section>
    </div>
  );
}