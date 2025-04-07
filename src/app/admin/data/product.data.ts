import { OrderStatus } from "../../data/table.data";

export interface ProductData {
    productId: string;
    title: string;
    type: string;
    subType: string;
    imageUrl: string;
    price: string;
    boxPrice: string;
    amount: number;
    status: OrderStatus;
    date: string;
}
