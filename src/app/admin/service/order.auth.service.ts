import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { OrderDetailsTable, OrderTable, OrderStatus, ProductTable } from '../../data/table.data';

@Injectable({
    providedIn: 'root'
})
export class OrderAuthService {
    constructor() {}
    currentDate = new Date().toISOString();


     getOrderData(): Observable<OrderDetailsTable[]> {
            const mockCards: OrderDetailsTable[] = [
                {
                    orderId: "00001",
                    status: OrderStatus.PENDING,
                    date: this.currentDate
                },
                {
                    orderId: "00002",
                    status: OrderStatus.FINISHED,
                    date: this.currentDate
                },
                {
                    orderId: "00003",
                    status: OrderStatus.SENT,
                    date: this.currentDate
                },
                {
                    orderId: "00004",
                    status: OrderStatus.UNDERWAY,
                    date: this.currentDate
                },
                {
                    orderId: "00005",
                    status: OrderStatus.CANCELLED,
                    date: this.currentDate
                }
            ];
        return of(mockCards);
        }
    
    getOrderTable(): Observable<OrderTable[]>{
        const mockOrders: OrderTable[] = [
            {
                orderId: '12345',
                customerName: 'John Doe',
                totalAmount: 100,
                status: OrderStatus.PENDING,
                date: this.currentDate
            },
            {
                orderId: '67890',
                customerName: 'Jane Smith',
                totalAmount: 200,
                status: OrderStatus.PENDING,
                date: this.currentDate
            },
            {
                orderId: '13579',
                customerName: 'Alice Johnson',
                totalAmount: 150,
                status: OrderStatus.CANCELLED,
                date: this.currentDate
            },
            {
                orderId: '24680',
                customerName: 'Bob Brown',
                totalAmount: 300,
                status: OrderStatus.SENT,
                date: this.currentDate
            },
            {
                orderId: '12345',
                customerName: 'John Doe',
                totalAmount: 100,
                status: OrderStatus.FINISHED,
                date: this.currentDate
            },
            {
                orderId: '67890',
                customerName: 'Jane Smith',
                totalAmount: 200,
                status: OrderStatus.FINISHED,
                date: this.currentDate
            },
            {
                orderId: '13579',
                customerName: 'Alice Johnson',
                totalAmount: 150,
                status: OrderStatus.CANCELLED,
                date: this.currentDate
            }
        ];
        return of(mockOrders);
    }

    getProductTable(): Observable<ProductTable[]> {
        const mockProducts: ProductTable[] = [
          {
            productId: '1',
            productName: 'Produto 1',
            price: 50,
            amount: 2,
            status: OrderStatus.PENDING,
            category: 'Categoria A'
          },
          {
            productId: '2',
            productName: 'Produto 2',
            price: 30,
            amount: 1,
            status: OrderStatus.SENT,
            category: 'Categoria B'
          },
        ];
        return of(mockProducts);
      }
}
