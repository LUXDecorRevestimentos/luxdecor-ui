export interface ProductData {
  price: string;
}

export interface Product {
  id: number;
  title: string;
  type: string;
  imageUrl: string;
  data: ProductData;
}
