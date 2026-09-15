import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  X,
  Star,
  ChevronDown,
  Package,
} from 'lucide-react';
import {
  products,
  categories,
  searchProducts,
} from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { useApp } from '@/context/AppContext';

type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchQuery, setSearchQuery } = useApp();
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'All'
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setPriceRange([0, 100000]);
    setMinRating(0);
    setLocalSearch('');
    setSearchQuery('');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  const filteredProducts = useMemo(() => {
    let result = searchProducts(searchQuery);

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, priceRange, minRating, sortBy]);

  const activeFilterCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (priceRange[0] !== 0 || priceRange[1] !== 100000 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-7">
      {/* Categories */}
      <div>
        <h3 className="font-display font-semibold text-sm text-neutral-800 dark:text-neutral-100 mb-3 uppercase tracking-wider">
          Categories
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => handleCategoryChange('All')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              selectedCategory === 'All'
                ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-semibold'
                : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700'
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-semibold'
                  : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price filter */}
      <div>
        <h3 className="font-display font-semibold text-sm text-neutral-800 dark:text-neutral-100 mb-3 uppercase tracking-wider">
          Price Range
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 outline-none focus:border-primary-500"
              placeholder="Min"
              aria-label="Minimum price"
            />
            <span className="text-neutral-400">—</span>
            <input
              type="number"
              min={0}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 outline-none focus:border-primary-500"
              placeholder="Max"
              aria-label="Maximum price"
            />
          </div>
          <input
            type="range"
            min={0}
            max={100000}
            step={500}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-primary-600"
            aria-label="Price range slider"
          />
          <p className="text-xs text-neutral-500">
            Up to ₹{priceRange[1].toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Rating filter */}
      <div>
        <h3 className="font-display font-semibold text-sm text-neutral-800 dark:text-neutral-100 mb-3 uppercase tracking-wider">
          Minimum Rating
        </h3>
        <div className="space-y-2">
          {[0, 4, 4.5, 4.8].map((rating) => (
            <button
              key={rating}
              onClick={() => setMinRating(rating)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                minRating === rating
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-semibold'
                  : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700'
              }`}
            >
              {rating === 0 ? (
                'All Ratings'
              ) : (
                <>
                  <Star className="w-3.5 h-3.5 fill-warning-500 text-warning-500" />
                  {rating}+ Stars
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Clear filters */}
      {activeFilterCount > 0 && (
        <button
          onClick={clearFilters}
          className="w-full py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2"
        >
          <X className="w-4 h-4" />
          Clear All Filters ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="animate-fade-in bg-neutral-50 dark:bg-neutral-950 min-h-screen">
      {/* Page header */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
        <div className="section-container py-8">
          <h1 className="font-display font-bold text-3xl lg:text-4xl text-neutral-900 dark:text-white mb-2">
            Shop
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400">
            Discover premium products at unbeatable prices
          </p>
        </div>
      </div>

      <div className="section-container py-8">
        {/* Search + sort bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <form onSubmit={handleSearch} className="flex-1 relative">
            <input
              type="search"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search products by name, category, or description..."
              className="input-field pl-11"
              aria-label="Search products"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          </form>

          <div className="flex gap-3">
            {/* Sort dropdown */}
            <div className="relative flex-1 sm:flex-initial">
              <button
                onClick={() => setShowSortDropdown((v) => !v)}
                className="w-full sm:w-auto input-field flex items-center justify-between gap-2 cursor-pointer"
                aria-label="Sort products"
                aria-expanded={showSortDropdown}
              >
                <span className="text-sm">
                  Sort: {sortOptions.find((o) => o.value === sortBy)?.label}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showSortDropdown && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-neutral-800 rounded-xl shadow-card-hover border border-neutral-100 dark:border-neutral-700 py-2 z-20 animate-scale-in origin-top-right">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSortDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        sortBy === option.value
                          ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-semibold'
                          : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter toggle (mobile) */}
            <button
              onClick={() => setShowFilters(true)}
              className="btn-secondary lg:hidden whitespace-nowrap"
              aria-label="Show filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1 w-5 h-5 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28 bg-white dark:bg-neutral-800 rounded-2xl shadow-card border border-neutral-100 dark:border-neutral-700 p-5">
              <div className="flex items-center gap-2 mb-5">
                <SlidersHorizontal className="w-5 h-5 text-primary-700 dark:text-primary-400" />
                <h2 className="font-display font-semibold text-lg text-neutral-800 dark:text-neutral-100">
                  Filters
                </h2>
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Products grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Showing{' '}
                <span className="font-semibold text-neutral-800 dark:text-neutral-100">
                  {filteredProducts.length}
                </span>{' '}
                of {products.length} products
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="card p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="font-display font-semibold text-lg text-neutral-800 dark:text-neutral-100 mb-2">
                  No Products Found
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-5">
                  Try adjusting your filters or search terms to find what you&apos;re looking for.
                </p>
                <button onClick={clearFilters} className="btn-primary">
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden animate-fade-in"
            onClick={() => setShowFilters(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 w-[300px] max-w-[85vw] bg-white dark:bg-neutral-900 z-[70] lg:hidden shadow-2xl transition-transform duration-300 overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-neutral-900 flex items-center justify-between p-5 border-b border-neutral-100 dark:border-neutral-800 z-10">
              <h2 className="font-display font-semibold text-lg text-neutral-800 dark:text-neutral-100">
                Filters
              </h2>
              <button
                onClick={() => setShowFilters(false)}
                className="btn-icon"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <FilterContent />
            </div>
            <div className="sticky bottom-0 bg-white dark:bg-neutral-900 p-4 border-t border-neutral-100 dark:border-neutral-800">
              <button
                onClick={() => setShowFilters(false)}
                className="btn-primary w-full"
              >
                Show {filteredProducts.length} Results
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
