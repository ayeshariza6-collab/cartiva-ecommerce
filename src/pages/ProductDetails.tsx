import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  ChevronRight,
  Check,
  Truck,
  RotateCcw,
  ShieldCheck,
  Eye,
} from 'lucide-react';
import { getProductById, getRelatedProducts } from '@/data/products';
import { useApp } from '@/context/AppContext';
import { formatPrice } from '@/utils/format';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';

const reviewsData = [
  { name: 'Aarav Patel', rating: 5, date: '2 weeks ago', text: 'Excellent product quality! Exceeded my expectations. Fast delivery and great packaging.', avatar: 'AP' },
  { name: 'Sneha Reddy', rating: 4, date: '1 month ago', text: 'Good value for money. Works as described. Would recommend to friends and family.', avatar: 'SR' },
  { name: 'Vikram Singh', rating: 5, date: '1 month ago', text: 'Outstanding build quality and performance. Cartiva has become my preferred shopping destination.', avatar: 'VS' },
];

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? getProductById(id) : undefined;
  const { addToCart, toggleWishlist, isInWishlist, addRecentlyViewed, showToast } = useApp();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id);
      setSelectedImage(0);
      setQuantity(1);
      setSelectedColor(product.colors?.[0]?.name);
      setSelectedSize(product.sizes?.[0]);
      setActiveTab('description');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!product) {
    return (
      <div className="section-container py-20 text-center">
        <h1 className="font-display font-bold text-2xl text-neutral-800 dark:text-neutral-100 mb-4">
          Product Not Found
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 mb-6">
          The product you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link to="/shop" className="btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  const images = [product.image, ...product.additionalImages];
  const relatedProducts = getRelatedProducts(product.id, 4);
  const wished = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product.id, quantity, selectedColor, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product.id, quantity, selectedColor, selectedSize);
    navigate('/checkout');
  };

  return (
    <div className="animate-fade-in bg-neutral-50 dark:bg-neutral-950 min-h-screen pb-16">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
        <div className="section-container py-4">
          <nav className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary-700 dark:hover:text-primary-400">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/shop" className="hover:text-primary-700 dark:hover:text-primary-400">Shop</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              to={`/shop?category=${encodeURIComponent(product.category)}`}
              className="hover:text-primary-700 dark:hover:text-primary-400"
            >
              {product.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-neutral-800 dark:text-neutral-100 font-medium truncate">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="section-container py-8">
        {/* Main product section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image gallery */}
          <div className="flex flex-col-reverse lg:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? 'border-primary-600 ring-2 ring-primary-500/20'
                      : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300'
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 card overflow-hidden">
              <div className="relative aspect-square bg-neutral-100 dark:bg-neutral-700">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover animate-fade-in"
                  key={selectedImage}
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 badge bg-primary-700 text-white shadow-soft">
                    {product.badge}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="absolute top-4 right-4 badge bg-error-500 text-white shadow-soft">
                    -{product.discount}%
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-2">
              {product.category}
            </p>
            <h1 className="font-display font-bold text-2xl lg:text-3xl text-neutral-900 dark:text-white mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-4 h-4 ${
                      idx < Math.floor(product.rating)
                        ? 'fill-warning-500 text-warning-500'
                        : 'text-neutral-200 dark:text-neutral-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
                {product.rating}
              </span>
              <span className="text-sm text-neutral-400">
                ({product.reviewCount.toLocaleString('en-IN')} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5">
              <span className="font-display font-extrabold text-3xl text-neutral-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-neutral-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="badge bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-400">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-5">
                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
                  Color: <span className="text-neutral-500 font-normal">{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-sm transition-all ${
                        selectedColor === color.name
                          ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/30'
                          : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300'
                      }`}
                      aria-label={`Select color ${color.name}`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-neutral-300 dark:border-neutral-600"
                        style={{ backgroundColor: color.hex }}
                      />
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-5">
                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
                  Size: <span className="text-neutral-500 font-normal">{selectedSize}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'border-primary-600 bg-primary-600 text-white'
                          : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-primary-300'
                      }`}
                      aria-label={`Select size ${size}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
                Quantity
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center border-2 border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-11 h-11 flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors disabled:opacity-40"
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-14 text-center font-semibold text-neutral-800 dark:text-neutral-100" aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="w-11 h-11 flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-neutral-500">
                  Subtotal: <span className="font-semibold text-neutral-800 dark:text-neutral-100">{formatPrice(product.price * quantity)}</span>
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className="btn-primary flex-1"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="btn-secondary flex-1 !border-primary-600 !text-primary-700 hover:!bg-primary-50"
              >
                Buy Now
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`btn-icon !w-12 !h-12 !rounded-xl border-2 ${
                  wished
                    ? '!border-error-500 !text-error-500'
                    : '!border-neutral-200 dark:!border-neutral-700'
                }`}
                aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
                aria-pressed={wished}
              >
                <Heart className={`w-5 h-5 ${wished ? 'fill-current animate-heart-pop' : ''}`} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-5 border-t border-neutral-100 dark:border-neutral-700">
              {[
                { Icon: Truck, label: 'Free Delivery' },
                { Icon: RotateCcw, label: '7-Day Returns' },
                { Icon: ShieldCheck, label: 'Warranty' },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1.5">
                  <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs section */}
        <div className="mt-12 card overflow-hidden">
          <div className="flex border-b border-neutral-100 dark:border-neutral-700">
            {[
              { key: 'description', label: 'Description' },
              { key: 'specs', label: 'Specifications' },
              { key: 'reviews', label: `Reviews (${product.reviewCount.toLocaleString('en-IN')})` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`px-5 lg:px-8 py-4 text-sm font-semibold transition-colors relative ${
                  activeTab === tab.key
                    ? 'text-primary-700 dark:text-primary-400'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
                )}
              </button>
            ))}
          </div>

          <div className="p-6 lg:p-8">
            {activeTab === 'description' && (
              <div className="prose prose-sm max-w-none animate-fade-in">
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-base">
                  {product.description}
                </p>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mt-4">
                  Every {product.name} is crafted with meticulous attention to detail, ensuring
                  you receive a product that meets the highest standards of quality and
                  performance. Backed by our commitment to customer satisfaction, this product
                  comes with comprehensive warranty coverage and easy return options.
                </p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="animate-fade-in">
                <table className="w-full">
                  <tbody>
                    {product.specifications.map((spec, idx) => (
                      <tr
                        key={spec.label}
                        className={idx % 2 === 0 ? 'bg-neutral-50 dark:bg-neutral-800/50' : ''}
                      >
                        <td className="py-3 px-4 text-sm font-semibold text-neutral-700 dark:text-neutral-200 w-1/3">
                          {spec.label}
                        </td>
                        <td className="py-3 px-4 text-sm text-neutral-600 dark:text-neutral-300">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="animate-fade-in space-y-6">
                {/* Review summary */}
                <div className="flex items-center gap-8 pb-6 border-b border-neutral-100 dark:border-neutral-700">
                  <div className="text-center">
                    <p className="font-display font-extrabold text-4xl text-neutral-900 dark:text-white">
                      {product.rating}
                    </p>
                    <div className="flex items-center gap-0.5 mt-1 justify-center">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-4 h-4 ${
                            idx < Math.floor(product.rating)
                              ? 'fill-warning-500 text-warning-500'
                              : 'text-neutral-200 dark:text-neutral-700'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {product.reviewCount.toLocaleString('en-IN')} reviews
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      This product has received excellent feedback from our customers. The
                      majority of buyers rate it highly for quality, value, and performance.
                    </p>
                  </div>
                </div>

                {/* Individual reviews */}
                {reviewsData.map((review) => (
                  <div key={review.name} className="flex gap-4">
                    <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold text-sm">
                      {review.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <p className="font-semibold text-sm text-neutral-800 dark:text-neutral-100">
                          {review.name}
                        </p>
                        <span className="text-xs text-neutral-400">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-0.5 mt-1 mb-2">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className={`w-3.5 h-3.5 ${
                              idx < review.rating
                                ? 'fill-warning-500 text-warning-500'
                                : 'text-neutral-200 dark:text-neutral-700'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        {review.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display font-bold text-2xl text-neutral-900 dark:text-white mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 80}>
                  <ProductCard product={p} />
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}

        {/* Recently viewed */}
        <RecentlyViewed currentId={product.id} />
      </div>
    </div>
  );
}

function RecentlyViewed({ currentId }: { currentId: string }) {
  const { recentlyViewed } = useApp();
  const items = recentlyViewed
    .filter((id) => id !== currentId)
    .map((id) => getProductById(id))
    .filter(Boolean)
    .slice(0, 4);

  if (items.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="flex items-center gap-2 mb-6">
        <Eye className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        <h2 className="font-display font-bold text-2xl text-neutral-900 dark:text-white">
          Recently Viewed
        </h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {items.map((p, i) => (
          <ScrollReveal key={p!.id} delay={i * 80}>
            <ProductCard product={p!} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
