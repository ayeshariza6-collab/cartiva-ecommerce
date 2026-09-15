import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { categories } from '@/data/products';
import { useNavigate } from 'react-router-dom';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Wishlist', path: '/wishlist' },
  { label: 'Cart', path: '/cart' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const supportLinks = [
  'Help Center',
  'Shipping',
  'Returns',
  'Privacy Policy',
  'Terms & Conditions',
];

export default function Footer() {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    navigate(`/shop?category=${encodeURIComponent(category)}`);
  };

  return (
    <footer className="bg-neutral-900 dark:bg-black text-neutral-300 mt-auto">
      {/* Main footer */}
      <div className="section-container py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-extrabold text-xl text-white tracking-tight">
                CARTIVA
              </span>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed mb-5 max-w-xs">
              Shop Smart. Live Better. Your one-stop destination for premium products at unbeatable
              prices.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Youtube, label: 'YouTube' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-9 h-9 rounded-lg bg-neutral-800 hover:bg-primary-700 flex items-center justify-center transition-all duration-200 hover:scale-105"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4 text-neutral-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop categories */}
          <div>
            <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-5">
              Shop
            </h3>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className="text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200 text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support + Contact */}
          <div>
            <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-5">
              Customer Support
            </h3>
            <ul className="space-y-3 mb-6">
              {supportLinks.map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="space-y-2 text-sm text-neutral-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span>support@cartiva.shop</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span>Bengaluru, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-xs text-neutral-500">
            © 2026 Cartiva. All Rights Reserved.
          </p>
          <p className="text-xs text-neutral-500">
            Designed &amp; Developed by{' '}
            <span className="text-primary-400 font-medium">Ayesha Riza</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
