import { Payment } from "../core/paymentEngine";

let payment: Payment | null = null;
let listeners: any[] = [];

export function setPayment(p: Payment) {
  payment = p;
  listeners.forEach(fn => fn(payment));
}

export function getPayment() {
  return payment;
}

export function subscribePayment(fn: (p: Payment | null) => void) {
  listeners.push(fn);
  return () => {
    listeners = listeners.filter(l => l !== fn);
  };
}
