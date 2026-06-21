import { Order } from "./orderEngine";

export type PaymentStatus = "UNPAID" | "PAID";

export interface Payment {
  orderId: string;
  amount: number;
  status: PaymentStatus;
}

export function canPay(order: Order): boolean {
  return order.status === "DELIVERED";
}

export function createPayment(order: Order): Payment {
  if (!canPay(order)) {
    throw new Error("Payment not allowed before delivery");
  }

  return {
    orderId: order.id,
    amount: calculatePrice(order),
    status: "UNPAID",
  };
}

export function calculatePrice(order: Order): number {
  // نسخه ساده (بعداً کیلومتر + نرخ)
  return 50000;
}
