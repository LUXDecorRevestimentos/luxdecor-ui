import { ProductDetailsTable } from "./table.data";


export interface GenericCard {
    id: number;
    title: string;
    type: string;
    imageUrl: string
    data?: any;
}

export interface GenericSection {
    id: number;
    title: string;
    type: string;
    data?: any;
}

export interface ProductData {

    id: number;
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
    items?: CartCardData[];
  }
  

export interface CartCardData {
    id: number;
    title: string;
    type: string;
    imageUrl: string;
    price: any;
    amount: number;
    select: boolean;
}

export interface OrderCardData {
    id: number;
    title: string;
    type: string;
    imageUrl: string;
    price: any;
    amount: number;
    select: boolean;
    date: string;
    lastUpdate: string;
    status: OrderStatus;
}

export enum OrderStatus {
    UNDERWAY = 1,
    FINISHED = 2
}
