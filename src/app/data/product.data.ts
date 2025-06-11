export interface ProductData {
  price: string;
}

export interface Product {
  id: string;
  title: string;
  type: string;
  imageUrl: string;
  data: ProductData;
}
