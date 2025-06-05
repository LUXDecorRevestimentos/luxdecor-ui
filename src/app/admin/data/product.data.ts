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



export interface ProductImage {
  id: number;
  src: string;
  thumb?: string;
  caption: string;
  file?: File | null;
  product_img_id?: string;
}
