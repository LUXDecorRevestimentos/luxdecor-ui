export interface ProductDetailsTable {
  label: string;
  value: string;
}

export interface OrderDetailsTable {
  cartId: string;
  status: OrderStatus;
  date: string;
}

export interface OrderTable {
  cartId: string;
  customerName: string;
  totalPrice: string;
  status: OrderStatus;
  date: string;
}

export interface OrderUpdateStatus {
  order_id: string;
  status: number;
}

export interface ProductTable {
  orderId: string;
  productId: string;
  productName: string;
  price: number;
  amount: number;
  status: OrderStatus;
  category: string;
}

export interface ClientTable {
  clientId: string;
  name: string;
  email: string;
  phone: string;
  date: string;
}

export interface SalesTable {
  saleId: string;
  cartId: string;
  clientId: string;
  value: string;
  date: string;
}

export interface ManagerTable {
  adminId: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  lastAccess: string;
}


export enum OrderStatus {
  PAYMENT = 0,
  PENDING = 1,
  UNDERWAY = 2,
  INSTALLATION = 3,
  FINISHED = 4,
  CANCELLED = 5
}

export const OrderStatusLabels: { [key: number]: string } = {
  [OrderStatus.PAYMENT]: "Em Aberto", // Pendente
  [OrderStatus.PENDING]: "Pendente", // Pendente
  [OrderStatus.UNDERWAY]: "A caminho", // Processando
  [OrderStatus.INSTALLATION]: "Instalando", // Processando
  [OrderStatus.FINISHED]: "Concluido", // Concluido
  [OrderStatus.CANCELLED]: "Cancelado" // Cancelado
};
