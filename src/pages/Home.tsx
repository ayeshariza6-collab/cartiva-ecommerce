import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Star,
  Quote,
  Mail,
  Cpu,
  Shirt,
  Footprints,
  Sparkles,
  Watch,
  Home as HomeIcon,
} from 'lucide-react';
import {
  categories,
  categoryInfo,
  getFeaturedProducts,
  getBestSellers,
} from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu,
  Shirt,
  Footprints,
  Sparkles,
  Watch,
  Home: HomeIcon,
};

const reviews = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'Amazing shopping experience! The product quality exceeded my expectations and delivery was super fast. Cartiva is my go-to shopping platform now.',
    avatar: 'PS',
  },
  {
    name: 'Rahul Verma',
    location: 'Delhi',
    rating: 5,
    text: 'I ordered headphones and they arrived within 2 days. The packaging was premium and the product was exactly as described. Highly recommended!',
    avatar: 'RV',
  },
  {
    name: 'Ananya Iyer',
    location: 'Bengaluru',
    rating: 4,
    text: 'Great variety of products and the prices are unbeatable. The wishlist feature is so handy. Customer support is responsive and helpful.',
    avatar: 'AI',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const featuredProducts = getFeaturedProducts();
  const bestSellers = getBestSellers();
  const { showToast } = useApp();
  const [email, setEmail] = useState('');

  const handleCategoryClick = (category: string) => {
    navigate(`/shop?category=${encodeURIComponent(category)}`);
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      showToast('Successfully subscribed to newsletter!', 'success');
      setEmail('');
    }
  };

  return (
    <div className="animate-fade-in">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-primary-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200/30 dark:bg-primary-800/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-200/30 dark:bg-accent-800/20 rounded-full blur-3xl" />
        </div>

        <div className="section-container relative py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="animate-fade-in-up">
              <span className="badge bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 mb-5">
                <Sparkles className="w-3 h-3" /> Premium Shopping Experience
              </span>
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-neutral-900 dark:text-white leading-tight mb-5 text-balance">
                Shop Smart.{' '}
                <span className="text-primary-700 dark:text-primary-400">Live Better.</span>
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-8 max-w-xl">
                Discover a world of premium products at unbeatable prices. From cutting-edge
                electronics to fashion-forward apparel, Cartiva brings you the best shopping
                experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/shop" className="btn-primary text-base">
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => navigate('/shop')}
                  className="btn-secondary text-base"
                >
                  Explore Categories
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8 mt-12">
                {[
                  { value: '24+', label: 'Products' },
                  { value: '6', label: 'Categories' },
                  { value: '10K+', label: 'Happy Customers' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display font-bold text-2xl text-primary-700 dark:text-primary-400">
                      {stat.value}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right visual */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              <div className="relative rounded-3xl overflow-hidden shadow-card-hover">
                <img
                  src="https://images.pexels.com/photos/6567204/pexels-photo-6567204.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Shopping with Cartiva"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent" />
              </div>

              {/* Floating cards */}
              <div className="absolute -bottom-5 -left-5 bg-white dark:bg-neutral-800 rounded-2xl shadow-card-hover p-4 hidden sm:flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="w-10 h-10 rounded-xl bg-success-100 dark:bg-success-700/30 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-success-600 dark:text-success-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">Secure Payment</p>
                  <p className="text-xs text-neutral-500">100% protected</p>
                </div>
              </div>

              <div className="absolute -top-5 -right-5 bg-white dark:bg-neutral-800 rounded-2xl shadow-card-hover p-4 hidden sm:flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <div className="w-10 h-10 rounded-xl bg-warning-100 dark:bg-warning-700/30 flex items-center justify-center">
                  <Star className="w-5 h-5 text-warning-500 fill-warning-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">4.8 Rating</p>
                  <p className="text-xs text-neutral-500">10K+ reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES SECTION ===== */}
      <section className="py-16 lg:py-20 bg-white dark:bg-neutral-900">
        <div className="section-container">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="badge bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 mb-3">
                Browse by category
              </span>
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-neutral-900 dark:text-white mb-3">
                Shop by Category
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto">
                Explore our wide range of premium products across every category
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5">
            {categories.map((cat, i) => {
              const Icon = categoryIcons[categoryInfo[cat].icon] || Sparkles;
              return (
                <ScrollReveal key={cat} delay={i * 80}>
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className="card w-full p-5 lg:p-6 flex flex-col items-center text-center group hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/40 dark:to-accent-900/40 flex items-center justify-center mb-3 group-hover:from-primary-600 group-hover:to-primary-800 transition-all duration-300">
                      <Icon className="w-7 h-7 text-primary-700 dark:text-primary-300 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-semibold text-sm text-neutral-800 dark:text-neutral-100 mb-1">
                      {cat}
                    </h3>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500">
                      {categoryInfo[cat].description}
                    </p>
                  </button>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-16 lg:py-20 bg-neutral-50 dark:bg-neutral-950">
        <div className="section-container">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <span className="badge bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 mb-3">
                  Handpicked for you
                </span>
                <h2 className="font-display font-bold text-3xl lg:text-4xl text-neutral-900 dark:text-white">
                  Featured Products
                </h2>
              </div>
              <Link
                to="/shop"
                className="text-sm font-semibold text-primary-700 dark:text-primary-400 hover:underline flex items-center gap-1"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {featuredProducts.slice(0, 8).map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 60}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SPECIAL OFFER BANNER ===== */}
      <section className="py-16 lg:py-20 bg-white dark:bg-neutral-900">
        <div className="section-container">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-800 to-primary-600 dark:from-primary-900 dark:to-primary-700 p-8 lg:p-14 text-center text-white">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-accent-300/10 rounded-full blur-3xl" />
              </div>
              <div className="relative">
                <span className="badge bg-white/20 text-white mb-4">
                  Limited Time Offer
                </span>
                <h2 className="font-display font-extrabold text-4xl lg:text-5xl mb-3">
                  Up to 40% Off
                </h2>
                <p className="text-lg text-primary-100 mb-7 max-w-md mx-auto">
                  Don&apos;t miss out on incredible deals across all categories. Shop now and save
                  big on premium products.
                </p>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary-700 font-bold rounded-xl hover:bg-primary-50 active:scale-[0.98] transition-all duration-200 shadow-soft"
                >
                  Shop the Sale
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== BEST SELLERS ===== */}
      <section className="py-16 lg:py-20 bg-neutral-50 dark:bg-neutral-950">
        <div className="section-container">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <span className="badge bg-warning-100 dark:bg-warning-700/30 text-warning-700 dark:text-warning-400 mb-3">
                  Top rated
                </span>
                <h2 className="font-display font-bold text-3xl lg:text-4xl text-neutral-900 dark:text-white">
                  Best Sellers
                </h2>
              </div>
              <Link
                to="/shop"
                className="text-sm font-semibold text-primary-700 dark:text-primary-400 hover:underline flex items-center gap-1"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {bestSellers.slice(0, 4).map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 60}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CARTIVA ===== */}
      <section className="py-16 lg:py-20 bg-white dark:bg-neutral-900">
        <div className="section-container">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="badge bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 mb-3">
                Why choose us
              </span>
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-neutral-900 dark:text-white mb-3">
                Why Cartiva?
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto">
                We&apos;re committed to providing you the best shopping experience possible
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: Truck, title: 'Fast Delivery', desc: 'Free shipping on orders above ₹999 with 2-5 day delivery' },
              { Icon: ShieldCheck, title: 'Secure Shopping', desc: 'Your data and payments are always 100% protected' },
              { Icon: RotateCcw, title: 'Easy Returns', desc: '7-day hassle-free return policy on all products' },
              { Icon: Headphones, title: '24/7 Support', desc: 'Our customer care team is always here to help you' },
            ].map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 80}>
                <div className="card p-6 text-center group hover:shadow-card-hover transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/40 dark:to-accent-900/40 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.Icon className="w-8 h-8 text-primary-700 dark:text-primary-400" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-neutral-800 dark:text-neutral-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CUSTOMER REVIEWS ===== */}
      <section className="py-16 lg:py-20 bg-neutral-50 dark:bg-neutral-950">
        <div className="section-container">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="badge bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 mb-3">
                Testimonials
              </span>
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-neutral-900 dark:text-white mb-3">
                What Our Customers Say
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto">
                Real reviews from real customers who love shopping with Cartiva
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <ScrollReveal key={review.name} delay={i * 100}>
                <div className="card p-6 h-full flex flex-col">
                  <Quote className="w-8 h-8 text-primary-200 dark:text-primary-800 mb-4" />
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < review.rating
                            ? 'fill-warning-500 text-warning-500'
                            : 'text-neutral-200 dark:text-neutral-700'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6 flex-1">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-700">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold text-sm">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-neutral-800 dark:text-neutral-100">
                        {review.name}
                      </p>
                      <p className="text-xs text-neutral-400">{review.location}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="py-16 lg:py-20 bg-white dark:bg-neutral-900">
        <div className="section-container">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/40 dark:to-accent-900/40 flex items-center justify-center mx-auto mb-5">
                <Mail className="w-8 h-8 text-primary-700 dark:text-primary-400" />
              </div>
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-neutral-900 dark:text-white mb-3">
                Stay in the Loop
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 mb-8 max-w-md mx-auto">
                Subscribe to our newsletter for exclusive deals, new arrivals, and insider updates
              </p>
              <form
                onSubmit={handleNewsletter}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="input-field flex-1"
                  aria-label="Email address"
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              <p className="text-xs text-neutral-400 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
