import { ProductDetailsTable } from "./table.data";


export interface GenericCard {
    id: string;
    title: string;
    type: string;
    imageUrl: string;
    data?: any;
}

export interface GenericSection {
    id: number;
    title: string;
    type: string;
    data?: any;
}

export interface ProductData {

    id: string;
    title: string;
    brand: string;
    price: string;
    box_price: string;
    box_size: string;
    tamanho: string;
    medida: string;
    details: string;
    spec: string;
    images: string[];

    productDetailsTable: ProductDetailsTable[];
    productDimensionsTable: ProductDetailsTable[];

}

export interface Cart {
    id: string,
    completed: boolean,
    items?: CartCardItemData[];
}

export interface CartData {
    cart_id: string,
    delivery_total: string,
    install_list: InstallOption[],
    orders?: CartResponseItem[],
    product_total: string
}

export interface InstallOption {
    installation_id: string,
    title: string
}

export interface CartResponseItem {
    cart_id: string,
    date: string,
    delivery: string,
    installation_id: string,
    installation_title: string,
    installation_total: string,
    order_id: string,
    product_id: string,
    product_price: string,
    product_title: string,
    amount: string;
    status: string
}

export interface CartCardItemData {
    id: string;
    product_id: string;
    title: string;
    type: string;
    imageUrl: string;
    price: any;
    amount: string;
    select: boolean;
}

export interface OrderCardResponse {
    order_id: string;
    product_id: string;
    cart_id: string;
    client_id: string;
    date: string;
    delivery: string;
    installation_titla: string;
    installation_total: string;
    product_price: string;
    amount: string;
    product_title: string;
    status: string;
}

export interface OrderCardStatus {
    order_id: string;
    order_status_id: string;
    status: string;
    created: string;
}

export interface OrderCardInfo {
    current_status: string;
    order_id: string;
    status_list: OrderCardStatus[];
}

export interface OrderCardData {
    id: string;
    title: string;
    cartId: string;
    imageUrl: string;
    price: any;
    amount: string;
    select: boolean;
    date: string;
    lastUpdate: string;
    status: OrderStatus;
}

export enum OrderStatus {
  PAYMENT = 0,
  PENDING = 1,
  UNDERWAY = 4,
  INSTALLATION = 2,
  FINISHED = 3,
  CANCELLED = 5,
  PAIED = 6
}

export const OrderStatusLabels: { [key: number]: string } = {
  [OrderStatus.PAYMENT]: "Em Aberto", // Pendente
  [OrderStatus.PENDING]: "Pendente", // Pendente
  [OrderStatus.UNDERWAY]: "A caminho", // Processando
  [OrderStatus.INSTALLATION]: "Instalando", // Processando
  [OrderStatus.FINISHED]: "Concluido", // Concluido
  [OrderStatus.CANCELLED]: "Cancelado", // Cancelado
  [OrderStatus.PAIED]: "Pago" // Processando
};

export const OrderStatusValue: { [key: string]: OrderStatus } = {
  "Em Aberto": OrderStatus.PAYMENT,
  "Pendente": OrderStatus.PENDING,
  "A caminho": OrderStatus.UNDERWAY,
  "Instalando": OrderStatus.INSTALLATION,
  "Concluido": OrderStatus.FINISHED,
  "Cancelado": OrderStatus.CANCELLED,
  "Pago": OrderStatus.PAIED
};

export enum PaymentMethodType {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  PIX = 'PIX',
  BOLETO = 'BOLETO'
}
