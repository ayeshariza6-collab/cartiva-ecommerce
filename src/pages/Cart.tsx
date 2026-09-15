import { Link } from 'react-router-dom';
import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { getProductById } from '@/data/products';
import { formatPrice } from '@/utils/format';

export default function Cart() {
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useApp();

  const cartItems = cart
    .map((item) => {
      const product = getProductById(item.productId);
      return product ? { ...item, product } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const originalTotal = cartItems.reduce(
    (sum, item) => sum + item.product.originalPrice * item.quantity,
    0
  );
  const discount = originalTotal - subtotal;
  const shipping = subtotal >= 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="animate-fade-in bg-neutral-50 dark:bg-neutral-950 min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 rounded-3xl bg-white dark:bg-neutral-800 shadow-card flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-12 h-12 text-neutral-300 dark:text-neutral-600" />
          </div>
          <h1 className="font-display font-bold text-2xl text-neutral-800 dark:text-neutral-100 mb-3">
            Your Cart is Empty
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 mb-8 max-w-sm mx-auto">
            Looks like you haven&apos;t added anything yet. Explore our products and find something
            you love.
          </p>
          <Link to="/shop" className="btn-primary">
            <ShoppingBag className="w-5 h-5" />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in bg-neutral-50 dark:bg-neutral-950 min-h-screen pb-16">
      <div className="section-container py-8">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-display font-bold text-3xl lg:text-4xl text-neutral-900 dark:text-white mb-1">
              Shopping Cart
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-sm font-medium text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-900/20 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="card p-4 flex gap-4 group"
              >
                {/* Image */}
                <Link
                  to={`/product/${item.productId}`}
                  className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-700"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="min-w-0">
                      <p className="text-xs text-primary-600 dark:text-primary-400 mb-0.5">
                        {item.product.category}
                      </p>
                      <Link
                        to={`/product/${item.productId}`}
                        className="font-semibold text-sm sm:text-base text-neutral-800 dark:text-neutral-100 hover:text-primary-700 dark:hover:text-primary-400 transition-colors line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="flex-shrink-0 w-8 h-8 rounded-lg text-neutral-400 hover:text-error-500 hover:bg-error-50 dark:hover:bg-error-900/20 flex items-center justify-center transition-colors"
                      aria-label={`Remove ${item.product.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {(item.selectedColor || item.selectedSize) && (
                    <p className="text-xs text-neutral-400 mb-2">
                      {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                      {item.selectedColor && item.selectedSize && <span> · </span>}
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                    </p>
                  )}

                  <div className="flex items-end justify-between gap-2 mt-auto flex-wrap">
                    {/* Quantity */}
                    <div className="flex items-center border-2 border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-display font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                      {item.product.originalPrice > item.product.price && (
                        <p className="text-xs text-neutral-400 line-through">
                          {formatPrice(item.product.originalPrice * item.quantity)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 dark:text-primary-400 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 card p-6">
              <h2 className="font-display font-bold text-lg text-neutral-900 dark:text-white mb-5">
                Order Summary
              </h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500 dark:text-neutral-400">Subtotal</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-100">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500 dark:text-neutral-400">Discount</span>
                    <span className="font-medium text-success-600 dark:text-success-400">
                      -{formatPrice(discount)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500 dark:text-neutral-400">Shipping</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-100">
                    {shipping === 0 ? (
                      <span className="text-success-600 dark:text-success-400">FREE</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500 dark:text-neutral-400">Tax (5% GST)</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-100">
                    {formatPrice(tax)}
                  </span>
                </div>
              </div>

              {shipping > 0 && (
                <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-3 mb-5 text-xs text-primary-700 dark:text-primary-300 text-center">
                  Add {formatPrice(999 - subtotal)} more for FREE shipping!
                </div>
              )}

              <div className="border-t border-neutral-100 dark:border-neutral-700 pt-4 mb-5">
                <div className="flex justify-between items-baseline">
                  <span className="font-display font-semibold text-base text-neutral-900 dark:text-white">
                    Total
                  </span>
                  <span className="font-display font-extrabold text-2xl text-primary-700 dark:text-primary-400">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="btn-primary w-full"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </Link>

              <p className="text-xs text-neutral-400 text-center mt-4">
                Secure checkout · Your data is protected
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
