import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  ShoppingBag,
  Clock,
} from 'lucide-react';
import { formatPrice, getDeliveryDate } from '@/utils/format';
import type { Product } from '@/data/products';

interface OrderData {
  orderId: string;
  items: { product: Product; quantity: number; selectedColor?: string; selectedSize?: string }[];
  total: number;
  formData: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    paymentMethod: string;
  };
}

export default function Success() {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('cartiva_last_order');
    if (stored) {
      setOrder(JSON.parse(stored));
    }
  }, []);

  if (!order) {
    return (
      <div className="animate-fade-in bg-neutral-50 dark:bg-neutral-950 min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="font-display font-bold text-2xl text-neutral-800 dark:text-neutral-100 mb-3">
            No Recent Order Found
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 mb-8">
            Looks like you haven&apos;t placed an order yet.
          </p>
          <Link to="/shop" className="btn-primary">
            <ShoppingBag className="w-5 h-5" />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const paymentLabels: Record<string, string> = {
    upi: 'UPI Payment',
    card: 'Credit / Debit Card',
    cod: 'Cash on Delivery',
  };

  return (
    <div className="animate-fade-in bg-neutral-50 dark:bg-neutral-950 min-h-screen pb-16">
      <div className="section-container py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success header */}
          <div className="text-center mb-10">
            <div className="w-24 h-24 rounded-full bg-success-100 dark:bg-success-700/30 flex items-center justify-center mx-auto mb-6 animate-bounce-in">
              <CheckCircle2 className="w-14 h-14 text-success-600 dark:text-success-400" />
            </div>
            <h1 className="font-display font-bold text-3xl lg:text-4xl text-neutral-900 dark:text-white mb-3">
              Order Placed Successfully!
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
              Thank you for your purchase. We&apos;ve received your order and are getting it ready
              for shipment.
            </p>
          </div>

          {/* Order details card */}
          <div className="card p-6 lg:p-8 mb-6">
            <div className="grid sm:grid-cols-2 gap-6 pb-6 border-b border-neutral-100 dark:border-neutral-700">
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Order Number</p>
                <p className="font-display font-bold text-lg text-primary-700 dark:text-primary-400">
                  {order.orderId}
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Total Amount</p>
                <p className="font-display font-bold text-lg text-neutral-900 dark:text-white">
                  {formatPrice(order.total)}
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Payment Method</p>
                <p className="font-medium text-sm text-neutral-700 dark:text-neutral-200">
                  {paymentLabels[order.formData.paymentMethod] || order.formData.paymentMethod}
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Delivery To</p>
                <p className="font-medium text-sm text-neutral-700 dark:text-neutral-200">
                  {order.formData.city}, {order.formData.state}
                </p>
              </div>
            </div>

            {/* Delivery timeline */}
            <div className="flex items-center gap-4 py-5">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-xl bg-success-100 dark:bg-success-700/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-success-600 dark:text-success-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">Order Confirmed</p>
                  <p className="text-xs text-neutral-400">Today</p>
                </div>
              </div>
              <div className="w-8 h-0.5 bg-neutral-200 dark:bg-neutral-700 flex-shrink-0" />
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">Packing</p>
                  <p className="text-xs text-neutral-400">In progress</p>
                </div>
              </div>
              <div className="w-8 h-0.5 bg-neutral-200 dark:bg-neutral-700 flex-shrink-0" />
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-neutral-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">Out for Delivery</p>
                  <p className="text-xs text-neutral-400">Pending</p>
                </div>
              </div>
            </div>

            {/* Delivery estimate */}
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-primary-800 dark:text-primary-300">
                  Estimated Delivery
                </p>
                <p className="text-sm text-primary-700 dark:text-primary-400">
                  {getDeliveryDate()}
                </p>
              </div>
            </div>
          </div>

          {/* Order items */}
          <div className="card p-6 lg:p-8 mb-6">
            <h2 className="font-display font-semibold text-lg text-neutral-900 dark:text-white mb-5">
              Order Items ({order.items.length})
            </h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover bg-neutral-100 dark:bg-neutral-700 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100 line-clamp-1">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Qty: {item.quantity}
                      {item.selectedColor && ` · ${item.selectedColor}`}
                      {item.selectedSize && ` · Size: ${item.selectedSize}`}
                    </p>
                  </div>
                  <p className="font-semibold text-sm text-neutral-900 dark:text-white flex-shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/shop" className="btn-primary flex-1">
              <ShoppingBag className="w-5 h-5" />
              Continue Shopping
            </Link>
            <button
              onClick={() => window.print()}
              className="btn-secondary flex-1"
            >
              <Package className="w-5 h-5" />
              Print Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
