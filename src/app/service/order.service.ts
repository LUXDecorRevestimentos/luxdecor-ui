import { Injectable } from "@angular/core";
import { catchError, forkJoin, map, Observable, switchMap, tap, throwError } from "rxjs";
import { CartCardItemData, OrderCardData, OrderCardInfo, OrderCardResponse, OrderStatus, OrderStatusValue } from "../data/card.data";
import { ClientService } from "./client.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../enviroments/enviroment";
import { ProductService } from "./product.service";
import { OrderStatusLabels } from "../data/card.data";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiUrl = environment.apiUrl;

    cartData: any;
    cartItems: CartCardItemData[] = [];

    constructor(private http: HttpClient,
        private clientService: ClientService,
        private productService: ProductService) {}

    loadOrder(): Observable<OrderCardData[]> {
        return this.getOrders().pipe(
            switchMap(orders => {
                const transformedOrders$ = orders.map(order => 
                    this.transformOrderItem(order)
                );
                return forkJoin(transformedOrders$);
            }),
            tap(transformedOrders => {
                this.cartData = transformedOrders;
            })
        );
    }

    findOrder(order_id: string): Observable<OrderCardInfo> {
        const token = this.clientService.getCurrentUser()?.idToken;
        if (!token) {
            return throwError(() => new Error('No authentication token available'));
        }
    
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
    
        return this.http.post<OrderCardInfo>(
            `${this.apiUrl}/order/find`,
            { order_id },
            { headers }
        ).pipe(
            catchError(error => {
                console.error('Error finding order:', error);
                return throwError(() => new Error('Failed to fetch order details'));
            })
        );
    }
    getOrders(): Observable<OrderCardResponse[]> {
        let token = this.clientService.getCurrentUser()?.idToken;
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<OrderCardResponse[]>(`${this.apiUrl}/order/list`, { headers });
    }

    private transformOrderItem(order: OrderCardResponse): Observable<OrderCardData> {
        return this.productService.getImgs(order.product_id).pipe(
        map(imageUrl => ({
            id: order.order_id,
            title: order.product_title,
            cartId: order.cart_id,
            type: 'product',
            imageUrl: imageUrl[0].src,
            price: order.product_price,
            amount: order.amount,
            select: true,
            status: OrderStatusValue[order.status],
            date: order.date,
            lastUpdate: order.date
        }))
        );
    }

}
