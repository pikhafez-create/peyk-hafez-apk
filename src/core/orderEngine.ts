import { canTransition, OrderStatus } from "./orderStateMachine";

export interface Order {
  id: string;
  status: OrderStatus;
  customerId?: string;
  driverId?: string;
  pickup?: string;
  dropoff?: string;
}

export function updateOrderStatus(
  order: Order,
  newStatus: OrderStatus
): Order {
  if (!canTransition(order.status, newStatus)) {
    throw new Error(
      `Invalid transition: ${order.status} → ${newStatus}`
    );
  }

  return {
    ...order,
    status: newStatus,
  };
}
