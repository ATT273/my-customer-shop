import { formatPrice, getProductById } from "./products";

export interface Voucher {
  id: string;
  title: string;
  type: "flat" | "percentage";
  amount: number;
  condition?: VoucherCondition | null | undefined;
  startDate: string | Date;
  endDate: string | Date;
}

export interface VoucherCondition {
  productId?: string | undefined;
  threshold?: number | undefined;
  category?: string | undefined;
}

// Mock data until a real API is wired up.
export const VOUCHERS: Voucher[] = [
  {
    id: "v1",
    title: "Giảm 50K cho đơn đầu tiên",
    type: "flat",
    amount: 50000,
    condition: { threshold: 300000 },
    startDate: "2026-10-01",
    endDate: "2026-12-31",
  },
  {
    id: "v2",
    title: "Giảm 10% toàn shop",
    type: "percentage",
    amount: 10,
    condition: null,
    startDate: "2026-10-15",
    endDate: "2026-11-15",
  },
  {
    id: "v3",
    title: "Giảm 100K đơn từ 1 triệu",
    type: "flat",
    amount: 100000,
    condition: { threshold: 1000000 },
    startDate: "2026-10-20",
    endDate: "2026-11-30",
  },
  {
    id: "v4",
    title: "Ưu đãi sneaker trắng",
    type: "percentage",
    amount: 15,
    condition: { productId: "3" },
    startDate: "2026-10-01",
    endDate: "2026-11-10",
  },
  {
    id: "v5",
    title: "Giảm 20% phụ kiện",
    type: "percentage",
    amount: 20,
    condition: { category: "Phụ kiện", threshold: 200000 },
    startDate: "2026-11-01",
    endDate: "2026-11-30",
  },
  {
    id: "v6",
    title: "Giảm 30K đồ thời trang",
    type: "flat",
    amount: 30000,
    condition: { category: "Thời trang" },
    startDate: "2026-11-11",
    endDate: "2026-11-12",
  },
  {
    id: "v7",
    title: "Flash sale tai nghe bluetooth",
    type: "flat",
    amount: 120000,
    condition: { productId: "8" },
    startDate: "2026-09-01",
    endDate: "2026-09-30",
  },
];

export type VoucherStatus = "active" | "upcoming" | "expired";

export function getVoucherStatus(voucher: Voucher, now = new Date()): VoucherStatus {
  const start = new Date(voucher.startDate);
  const end = new Date(voucher.endDate);
  // Treat the end date as inclusive for the whole day.
  end.setHours(23, 59, 59, 999);

  if (now < start) return "upcoming";
  if (now > end) return "expired";
  return "active";
}

export function formatVoucherValue(voucher: Voucher) {
  if (voucher.type === "percentage") return `${voucher.amount}%`;
  return voucher.amount >= 1000 ? `${voucher.amount / 1000}K` : formatPrice(voucher.amount);
}

export function describeVoucherCondition(condition: Voucher["condition"]) {
  if (!condition) return "Áp dụng cho mọi đơn hàng";

  const parts: string[] = [];
  if (condition.productId) {
    const product = getProductById(condition.productId);
    parts.push(`Chỉ áp dụng cho ${product?.name ?? "sản phẩm chỉ định"}`);
  }
  if (condition.category) parts.push(`Danh mục ${condition.category}`);
  if (condition.threshold) parts.push(`Đơn tối thiểu ${formatPrice(condition.threshold)}`);

  return parts.length ? parts.join(" · ") : "Áp dụng cho mọi đơn hàng";
}

export function formatVoucherDate(date: string | Date) {
  const d = new Date(date);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}
