import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import type { Product } from '@/data/products';
import { useApp } from '@/context/AppContext';
import { formatPrice } from '@/utils/format';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const wished = isInWishlist(product.id);

  return (
    <div className="card group overflow-hidden hover:shadow-card-hover hover:-translate-y-1 flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-700">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="%23e2e8f0" width="400" height="300"/><text x="50%25" y="50%25" fill="%2394a3b8" font-family="sans-serif" font-size="14" text-anchor="middle" dy=".3em">Image unavailable</text></svg>';
            }}
          />
        </Link>

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 badge bg-primary-700 text-white shadow-soft">
            {product.badge}
          </span>
        )}

        {/* Discount badge */}
        {product.discount > 0 && (
          <span className="absolute top-3 right-3 badge bg-error-500 text-white shadow-soft">
            -{product.discount}%
          </span>
        )}

        {/* Wishlist button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-soft transition-all duration-300 ${
            wished
              ? 'bg-error-500 text-white animate-heart-pop'
              : 'bg-white/90 dark:bg-neutral-800/90 text-neutral-600 dark:text-neutral-300 hover:bg-error-500 hover:text-white opacity-0 group-hover:opacity-100'
          }`}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={wished}
        >
          <Heart className={`w-4 h-4 ${wished ? 'fill-current' : ''}`} />
        </button>

        {/* Quick view button */}
        <Link
          to={`/product/${product.id}`}
          className="absolute bottom-3 left-3 w-9 h-9 rounded-full bg-white/90 dark:bg-neutral-800/90 text-neutral-600 dark:text-neutral-300
                     flex items-center justify-center shadow-soft opacity-0 group-hover:opacity-100 transition-all duration-300
                     hover:bg-primary-700 hover:text-white"
          aria-label={`View ${product.name} details`}
        >
          <Eye className="w-4 h-4" />
        </Link>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs font-medium text-primary-600 dark:text-primary-400 mb-1">
          {product.category}
        </p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-sm text-neutral-800 dark:text-neutral-100 line-clamp-2 leading-snug mb-2 hover:text-primary-700 dark:hover:text-primary-400 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            <Star className="w-3.5 h-3.5 fill-warning-500 text-warning-500" />
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">
              {product.rating}
            </span>
          </div>
          <span className="text-xs text-neutral-400">({product.reviewCount.toLocaleString('en-IN')})</span>
        </div>

        {/* Price */}
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

        {/* Add to cart */}
        <button
          onClick={() => addToCart(product.id)}
          className="w-full py-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400
                     font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary-700 hover:text-white
                     dark:hover:bg-primary-700 dark:hover:text-white transition-all duration-200 active:scale-[0.98]"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
