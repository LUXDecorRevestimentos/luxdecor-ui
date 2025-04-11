export interface ProductDetailsTable {
  label: string;
  value: string;
}

export interface OrderDetailsTable {
  orderId: string;
  status: OrderStatus;
  date: string;
}

export interface OrderTable {
  orderId: string;
  customerName: string;
  totalAmount: number;
  status: OrderStatus;
  date: string;
}

export interface ProductTable {
  productId: string;
  productName: string;
  price: number;
  amount: number;
  status: OrderStatus;
  category: string;
}


export enum OrderStatus {
  PENDING = 1,
  SENT = 2,
  UNDERWAY = 3,
  FINISHED = 4,
  CANCELLED = 5
}

export const OrderStatusLabels: { [key: number]: string } = {
  [OrderStatus.PENDING]: "Pendente",
  [OrderStatus.SENT]: "Enviado",
  [OrderStatus.UNDERWAY]: "A caminho",
  [OrderStatus.FINISHED]: "Concluido",
  [OrderStatus.CANCELLED]: "Cancelado"
};
