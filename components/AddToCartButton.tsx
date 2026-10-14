'use client';

import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/store/useCart';


interface AddToCartButtonProps {
  product: {
    databaseId: string;
    id: string;
    name: string;
    slug: string;
    price?: string;
    image?: {
      sourceUrl?: string;
    };
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCart((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addItem({
      id: product.databaseId || product.id,      name: product.name,
      slug: product.slug,
      price: product.price || 'RM 0',
      image: product.image?.sourceUrl,
      quantity: quantity,
    });
  };

  return (
    <div className="space-y-4">
      {/* Kawalan Kuantiti */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">Kuantiti:</span>
        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-1 bg-gray-50 hover:bg-gray-100 transition text-gray-600"
          >
            -
          </button>
          <span className="px-4 py-1 text-sm font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-1 bg-gray-50 hover:bg-gray-100 transition text-gray-600"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full py-4 bg-black text-white rounded-2xl font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2 shadow-lg shadow-black/5"
      >
        <ShoppingBag size={20} /> Masuk Troli (Add to Cart)
      </button>
    </div>
  );
}