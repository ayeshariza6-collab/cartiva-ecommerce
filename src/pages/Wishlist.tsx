import { Link } from 'react-router-dom';
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowRight,
  ShoppingBag,
  X,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { getProductById } from '@/data/products';
import { formatPrice } from '@/utils/format';
import type { Product } from '@/data/products';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, moveWishlistToCart } = useApp();

  const items: Product[] = wishlist
    .map((id) => getProductById(id))
    .filter((p): p is Product => p !== undefined);

  if (items.length === 0) {
    return (
      <div className="animate-fade-in bg-neutral-50 dark:bg-neutral-950 min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 rounded-3xl bg-white dark:bg-neutral-800 shadow-card flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-neutral-300 dark:text-neutral-600" />
          </div>
          <h1 className="font-display font-bold text-2xl text-neutral-800 dark:text-neutral-100 mb-3">
            Your Wishlist is Empty
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 mb-8 max-w-sm mx-auto">
            Save items you love to your wishlist. Review them anytime and easily move them to your
            cart.
          </p>
          <Link to="/shop" className="btn-primary">
            <ShoppingBag className="w-5 h-5" />
            Discover Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in bg-neutral-50 dark:bg-neutral-950 min-h-screen pb-16">
      <div className="section-container py-8">
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl lg:text-4xl text-neutral-900 dark:text-white mb-1">
            My Wishlist
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {items.length} {items.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {items.map((product) => (
            <div key={product.id} className="card group overflow-hidden hover:shadow-card-hover transition-all duration-300 flex flex-col">
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-700">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                {product.discount > 0 && (
                  <span className="absolute top-3 left-3 badge bg-error-500 text-white">
                    -{product.discount}%
                  </span>
                )}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-neutral-800/90 text-neutral-600 dark:text-neutral-300 hover:text-error-500 flex items-center justify-center shadow-soft transition-colors"
                  aria-label={`Remove ${product.name} from wishlist`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <p className="text-xs text-primary-600 dark:text-primary-400 mb-1">
                  {product.category}
                </p>
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-sm text-neutral-800 dark:text-neutral-100 line-clamp-2 mb-2 hover:text-primary-700 dark:hover:text-primary-400 transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-baseline gap-2 mb-4 mt-auto">
                  <span className="font-display font-bold text-lg text-neutral-900 dark:text-white">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-xs text-neutral-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => moveWishlistToCart(product.id)}
                    className="flex-1 py-2.5 rounded-xl bg-primary-700 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary-800 active:scale-[0.98] transition-all"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Move to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="w-10 h-10 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 text-neutral-400 hover:text-error-500 hover:border-error-300 flex items-center justify-center transition-colors flex-shrink-0"
                    aria-label={`Remove ${product.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/shop" className="btn-secondary">
            <ShoppingBag className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
