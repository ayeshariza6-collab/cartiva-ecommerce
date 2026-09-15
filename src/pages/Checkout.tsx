import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CreditCard,
  Wallet,
  Banknote,
  Check,
  ShieldCheck,
  ArrowLeft,
  Lock,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { getProductById } from '@/data/products';
import { formatPrice, generateOrderId } from '@/utils/format';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'upi' | 'card' | 'cod';
}

interface FormErrors {
  [key: string]: string;
}

export default function Checkout() {
  const { cart, clearCart, showToast } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'upi',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

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
          <h1 className="font-display font-bold text-2xl text-neutral-800 dark:text-neutral-100 mb-3">
            Your Cart is Empty
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 mb-8">
            Add some products before proceeding to checkout.
          </p>
          <Link to="/shop" className="btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Please enter a complete address';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'PIN code is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit PIN code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please fix the errors in the form', 'error');
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      const orderId = generateOrderId();
      const orderDetails = {
        orderId,
        items: cartItems,
        total,
        formData: { ...formData, paymentMethod: formData.paymentMethod },
      };
      localStorage.setItem('cartiva_last_order', JSON.stringify(orderDetails));
      clearCart();
      navigate('/success');
    }, 1200);
  };

  const paymentMethods = [
    { value: 'upi' as const, label: 'UPI Payment', desc: 'Pay using any UPI app', Icon: Wallet },
    { value: 'card' as const, label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay', Icon: CreditCard },
    { value: 'cod' as const, label: 'Cash on Delivery', desc: 'Pay when you receive', Icon: Banknote },
  ];

  return (
    <div className="animate-fade-in bg-neutral-50 dark:bg-neutral-950 min-h-screen pb-16">
      <div className="section-container py-8">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 dark:text-primary-400 hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>

        <h1 className="font-display font-bold text-3xl lg:text-4xl text-neutral-900 dark:text-white mb-8">
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          {/* Left: form fields */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer info */}
            <div className="card p-6">
              <h2 className="font-display font-semibold text-lg text-neutral-900 dark:text-white mb-5">
                Customer Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Full Name <span className="text-error-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className={`input-field ${errors.fullName ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
                    placeholder="John Doe"
                    aria-invalid={!!errors.fullName}
                  />
                  {errors.fullName && <p className="text-xs text-error-500 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Email <span className="text-error-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`input-field ${errors.email ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
                    placeholder="john@example.com"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p className="text-xs text-error-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Phone Number <span className="text-error-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={`input-field ${errors.phone ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
                    placeholder="9876543210"
                    maxLength={10}
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && <p className="text-xs text-error-500 mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Shipping info */}
            <div className="card p-6">
              <h2 className="font-display font-semibold text-lg text-neutral-900 dark:text-white mb-5">
                Shipping Address
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Street Address <span className="text-error-500">*</span>
                  </label>
                  <input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className={`input-field ${errors.address ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
                    placeholder="House no, Street, Area"
                    aria-invalid={!!errors.address}
                  />
                  {errors.address && <p className="text-xs text-error-500 mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    City <span className="text-error-500">*</span>
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className={`input-field ${errors.city ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
                    placeholder="Mumbai"
                    aria-invalid={!!errors.city}
                  />
                  {errors.city && <p className="text-xs text-error-500 mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    State <span className="text-error-500">*</span>
                  </label>
                  <input
                    id="state"
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    className={`input-field ${errors.state ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
                    placeholder="Maharashtra"
                    aria-invalid={!!errors.state}
                  />
                  {errors.state && <p className="text-xs text-error-500 mt-1">{errors.state}</p>}
                </div>

                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    PIN Code <span className="text-error-500">*</span>
                  </label>
                  <input
                    id="pincode"
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => handleChange('pincode', e.target.value)}
                    className={`input-field ${errors.pincode ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}`}
                    placeholder="400001"
                    maxLength={6}
                    aria-invalid={!!errors.pincode}
                  />
                  {errors.pincode && <p className="text-xs text-error-500 mt-1">{errors.pincode}</p>}
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="card p-6">
              <h2 className="font-display font-semibold text-lg text-neutral-900 dark:text-white mb-5">
                Payment Method
              </h2>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <label
                    key={method.value}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.paymentMethod === method.value
                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.value}
                      checked={formData.paymentMethod === method.value}
                      onChange={(e) => handleChange('paymentMethod', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      formData.paymentMethod === method.value
                        ? 'bg-primary-600 text-white'
                        : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-500'
                    }`}>
                      <method.Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-neutral-800 dark:text-neutral-100">
                        {method.label}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {method.desc}
                      </p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      formData.paymentMethod === method.value
                        ? 'border-primary-600 bg-primary-600'
                        : 'border-neutral-300 dark:border-neutral-600'
                    }`}>
                      {formData.paymentMethod === method.value && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </label>
                ))}
              </div>
              <p className="text-xs text-neutral-400 mt-4 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                This is a demo checkout. No real payment will be processed.
              </p>
            </div>
          </div>

          {/* Right: order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 card p-6">
              <h2 className="font-display font-bold text-lg text-neutral-900 dark:text-white mb-5">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-lg object-cover bg-neutral-100 dark:bg-neutral-700"
                      />
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-neutral-800 dark:text-neutral-100 line-clamp-2">
                        {item.product.name}
                      </p>
                      <p className="text-sm font-semibold text-neutral-900 dark:text-white mt-0.5">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2.5 py-4 border-t border-neutral-100 dark:border-neutral-700">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500 dark:text-neutral-400">Subtotal</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-100">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500 dark:text-neutral-400">Discount</span>
                    <span className="font-medium text-success-600 dark:text-success-400">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500 dark:text-neutral-400">Shipping</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-100">
                    {shipping === 0 ? <span className="text-success-600 dark:text-success-400">FREE</span> : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500 dark:text-neutral-400">Tax (5% GST)</span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-100">{formatPrice(tax)}</span>
                </div>
              </div>

              <div className="border-t border-neutral-100 dark:border-neutral-700 pt-4 mb-5">
                <div className="flex justify-between items-baseline">
                  <span className="font-display font-semibold text-base text-neutral-900 dark:text-white">Total</span>
                  <span className="font-display font-extrabold text-2xl text-primary-700 dark:text-primary-400">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Place Order
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-neutral-400">
                <ShieldCheck className="w-4 h-4" />
                Secure SSL encrypted checkout
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
