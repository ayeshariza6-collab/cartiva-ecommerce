import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Heart,
  ShoppingCart,
  Search,
  Menu,
  X,
  Moon,
  Sun,
  UserRound,
  ShoppingBag,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { categories } from '@/data/products';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Wishlist', path: '/wishlist' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const { cartCount, wishlistCount, theme, toggleTheme, searchQuery, setSearchQuery } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const categoriesRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoriesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (categoriesRef.current && !categoriesRef.current.contains(e.target as Node)) {
        setCategoriesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setCategoriesOpen(false);
        setMobileSearchOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setMobileSearchOpen(false);
    setLocalSearch('');
    navigate('/shop');
  };

  const handleCategoryClick = (category: string) => {
    setCategoriesOpen(false);
    setMobileMenuOpen(false);
    navigate(`/shop?category=${encodeURIComponent(category)}`);
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-nav'
            : 'bg-white dark:bg-neutral-900'
        }`}
      >
        {/* Top announcement bar */}
        <div className="bg-primary-800 text-white text-xs py-2 px-4 text-center font-medium hidden sm:block">
          Free shipping on orders above ₹999 — Shop Smart. Live Better.
        </div>

        <nav className="section-container">
          <div className="flex items-center justify-between h-16 lg:h-18 gap-4">
            {/* Logo + Desktop Nav */}
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2 group" aria-label="CARTIVA home">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <span className="font-display font-extrabold text-xl text-primary-800 dark:text-white tracking-tight">
                  CARTIVA
                </span>
              </Link>

              {/* Desktop nav */}
              <div className="hidden lg:flex items-center gap-7">
                <Link
                  to="/"
                  className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}
                >
                  Home
                </Link>
                <Link
                  to="/shop"
                  className={`nav-link ${isActive('/shop') ? 'nav-link-active' : ''}`}
                >
                  Shop
                </Link>

                {/* Categories dropdown */}
                <div ref={categoriesRef} className="relative">
                  <button
                    onClick={() => setCategoriesOpen((v) => !v)}
                    className="nav-link flex items-center gap-1"
                    aria-expanded={categoriesOpen}
                    aria-haspopup="true"
                  >
                    Categories
                    <svg
                      className={`w-3.5 h-3.5 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {categoriesOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-neutral-800 rounded-xl shadow-card-hover border border-neutral-100 dark:border-neutral-700 py-2 animate-scale-in origin-top-left">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => handleCategoryClick(cat)}
                          className="w-full text-left px-4 py-2.5 text-sm text-neutral-600 dark:text-neutral-300 hover:bg-primary-50 dark:hover:bg-neutral-700 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  to="/wishlist"
                  className={`nav-link ${isActive('/wishlist') ? 'nav-link-active' : ''}`}
                >
                  Wishlist
                </Link>
                <Link
                  to="/about"
                  className={`nav-link ${isActive('/about') ? 'nav-link-active' : ''}`}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className={`nav-link ${isActive('/contact') ? 'nav-link-active' : ''}`}
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Desktop search */}
              <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
                <input
                  type="search"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-48 lg:w-56 pl-10 pr-3 py-2 text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  aria-label="Search products"
                />
                <Search className="absolute left-3 w-4 h-4 text-neutral-400 pointer-events-none" />
              </form>

              {/* Mobile search toggle */}
              <button
                onClick={() => setMobileSearchOpen((v) => !v)}
                className="btn-icon md:hidden"
                aria-label="Toggle search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist icon */}
              <Link to="/wishlist" className="btn-icon relative" aria-label="View wishlist">
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-error-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce-in">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart icon */}
              <Link to="/cart" className="btn-icon relative" aria-label="View cart">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center animate-bounce-in">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Theme toggle */}
              <button onClick={toggleTheme} className="btn-icon" aria-label="Toggle theme">
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>

              {/* Account icon */}
              <Link to="/profile" className="btn-icon hidden sm:flex" aria-label="Account">
                <UserRound className="w-5 h-5" />
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="btn-icon lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile search bar */}
        {mobileSearchOpen && (
          <div className="md:hidden border-t border-neutral-100 dark:border-neutral-700 px-4 py-3 bg-white dark:bg-neutral-900 animate-fade-in-down">
            <form onSubmit={handleSearch} className="flex items-center relative">
              <input
                type="search"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search products..."
                className="input-field pl-10"
                autoFocus
                aria-label="Search products"
              />
              <Search className="absolute left-3 w-5 h-5 text-neutral-400" />
            </form>
          </div>
        )}
      </header>

      {/* Mobile drawer overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />
        </div>
      )}

      {/* Mobile drawer */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 bottom-0 w-[300px] max-w-[85vw] bg-white dark:bg-neutral-900 z-[70] lg:hidden shadow-2xl transition-transform duration-300 ease-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-neutral-100 dark:border-neutral-800">
          <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-extrabold text-lg text-primary-800 dark:text-white">
              CARTIVA
            </span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="btn-icon"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto h-full pb-8">
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Categories section in mobile */}
            <div className="mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Categories
              </p>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-sm text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Cart link */}
            <Link
              to="/cart"
              className={`mt-2 px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center justify-between ${
                isActive('/cart')
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
            >
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="w-6 h-6 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>

      {/* Spacer to offset fixed navbar */}
      <div className="h-[72px] sm:h-[88px]" />
    </>
  );
}
