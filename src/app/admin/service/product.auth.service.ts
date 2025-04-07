import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductData } from '../data/product.data';
import { OrderStatus } from '../../data/table.data';

@Injectable({
  providedIn: 'root' 
})
export class ProductService {
  constructor() { }
  getProductId(): Observable<ProductData> {
    const product: ProductData = {
      productId: '1',
      title: 'Piso Laminado Eucafloor New Evidence Click',
      type: 'Piso',
      subType: 'Laminado',
      imageUrl: 'piso.png',
      price: '10.00',
      boxPrice: '50.00',
      amount: 10,
      status: OrderStatus.PENDING,
      date: "07:00 - 01/01/2023"
    };

    return of(product); // Retorna um Observable que emite o produto único
  }
}
