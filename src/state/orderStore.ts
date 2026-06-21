import { Order } from "../core/orderEngine";

let currentOrder: Order | null = null;
let listeners: any[] = [];

export function setOrder(order: Order) {
  currentOrder = order;
  listeners.forEach(fn => fn(currentOrder));
}

export function getOrder() {
  return currentOrder;
}

export function subscribeOrder(fn: (order: Order | null) => void) {
  listeners.push(fn);
  return () => {
    listeners = listeners.filter(l => l !== fn);
  };
}
