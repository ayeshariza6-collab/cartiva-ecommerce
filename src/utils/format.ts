export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatPriceShort(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

export function getDeliveryDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 5);
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

export function generateOrderId(): string {
  const prefix = 'CRT';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}${timestamp}${random}`;
}
