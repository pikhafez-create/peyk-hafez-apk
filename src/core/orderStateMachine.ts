export type OrderStatus =
  | "DRAFT"
  | "PENDING_ADMIN"
  | "APPROVED"
  | "ASSIGNED"
  | "DRIVER_ACCEPTED"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "PAID"
  | "CANCELLED";

const transitions: Record<OrderStatus, OrderStatus[]> = {
  DRAFT: ["PENDING_ADMIN"],
  PENDING_ADMIN: ["APPROVED", "CANCELLED"],
  APPROVED: ["ASSIGNED", "CANCELLED"],
  ASSIGNED: ["DRIVER_ACCEPTED", "CANCELLED"],
  DRIVER_ACCEPTED: ["PICKED_UP", "CANCELLED"],
  PICKED_UP: ["IN_TRANSIT", "CANCELLED"],
  IN_TRANSIT: ["DELIVERED", "CANCELLED"],
  DELIVERED: ["PAID"],
  PAID: [],
  CANCELLED: [],
};

export function canTransition(from: OrderStatus, to: OrderStatus): boolean {
  return transitions[from]?.includes(to) ?? false;
}
