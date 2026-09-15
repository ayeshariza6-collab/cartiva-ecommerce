import { useApp } from '@/context/AppContext';
import { Check, Heart, Info, X, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ToastContainer() {
  const { toasts, dismissToast } = useApp();

  return (
    <div
      className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
      ))}
    </div>
  );
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: { id: number; message: string; type: string };
  onDismiss: (id: number) => void;
}) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setExiting(true), 3200);
    return () => clearTimeout(timer);
  }, []);

  const icons = {
    success: <Check className="w-5 h-5 text-success-600" />,
    error: <X className="w-5 h-5 text-error-600" />,
    info: <Info className="w-5 h-5 text-primary-600" />,
    wishlist: <Heart className="w-5 h-5 text-error-500 fill-error-500" />,
  };

  const icon = icons[toast.type as keyof typeof icons] || icons.success;

  return (
    <div
      className={`pointer-events-auto flex items-center gap-3 bg-white dark:bg-neutral-800 rounded-xl shadow-card-hover border border-neutral-100 dark:border-neutral-700 px-4 py-3 min-w-[280px] max-w-sm animate-toast-in ${
        exiting ? 'opacity-0 translate-x-full transition-all duration-300' : ''
      }`}
      role="status"
    >
      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-neutral-50 dark:bg-neutral-700 flex items-center justify-center">
        {icon}
      </div>
      <p className="flex-1 text-sm font-medium text-neutral-700 dark:text-neutral-200">
        {toast.message}
      </p>
      <button
        onClick={() => onDismiss(toast.id)}
        className="flex-shrink-0 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
