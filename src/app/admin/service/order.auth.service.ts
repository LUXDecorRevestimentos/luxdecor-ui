import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { OrderDetailsTable, OrderTable, OrderStatus, ProductTable, OrderUpdateStatus } from '../../data/table.data';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../enviroments/enviroment";
import { ClientService } from "../../service/client.service";
import { ClientData } from "../data/client.data";

@Injectable({
    providedIn: 'root'
})
export class OrderAuthService {
    private apiUrl = environment.apiUrl;
    constructor(private http: HttpClient,
        private clientService: ClientService) {}

    currentDate = new Date().toISOString();


    getOrders(): Observable<OrderDetailsTable[]> {
      let token = this.clientService.getCurrentUser()?.idToken
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });  
      return this.http.get<OrderDetailsTable[]>(`${this.apiUrl}/admin/order/resume` , { headers });
    }

    getOrderTable(): Observable<any[]> {
        let token = this.clientService.getCurrentUser()?.idToken
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });  
        return this.http.get<any[]>(`${this.apiUrl}/admin/order/table` , { headers });
    }

    getOrderHistory(order_id: string): Observable<OrderDetailsTable[]>{
      let token = this.clientService.getCurrentUser()?.idToken
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const body = { order_id: order_id };

      return this.http.post<OrderDetailsTable[]>(
        `${this.apiUrl}/admin/order/history`,
        body,
        { headers });
    }

    getCartHistory(cart_id: string): Observable<OrderDetailsTable[]>{
      let token = this.clientService.getCurrentUser()?.idToken
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const body = { cart_id: cart_id };

      return this.http.post<OrderDetailsTable[]>(
        `${this.apiUrl}/admin/cart/history`,
        body,
        { headers });
    }

    getOrderChart(time: string): Observable<any> {
      let token = this.clientService.getCurrentUser()?.idToken
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const body = { time: time };

      return this.http.post<any>(
        `${this.apiUrl}/admin/order/chart`,
        body,
        { headers });
    }
    
    getCartTable(cart_id: string): Observable<ProductTable[]> {
        const token = this.clientService.getCurrentUser()?.idToken;
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        
        const body = { cart_id: cart_id };
        
        return this.http.post<ProductTable[]>(
            `${this.apiUrl}/admin/order/cart`,
            body,
            { headers }
        );
    }

    getClientData(cart_id: string): Observable<ClientData> {
        let token = this.clientService.getCurrentUser()?.idToken
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });  
    
        const body = { cart_id: cart_id }
    
        return this.http.post<ClientData>(`${this.apiUrl}/admin/client/info`, 
          body,
          { headers });
    
    }

    updateOrderStatus(orderUpdate: OrderUpdateStatus): Observable<void> {
        let token = this.clientService.getCurrentUser()?.idToken
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });    
        return this.http.post<void>(`${this.apiUrl}/admin/order/update`, 
            orderUpdate,
          { headers });
    } 

    getProductTable(): Observable<ProductTable[]> {
        const mockProducts: ProductTable[] = [
          {
            orderId: '1',
            productId: "2",
            productName: 'Produto 1',
            price: 50,
            amount: 2,
            status: OrderStatus.PENDING,
            category: 'Categoria A'
          },
          {
            orderId: '2',
            productId: "3",
            productName: 'Produto 2',
            price: 30,
            amount: 1,
            status: OrderStatus.FINISHED,
            category: 'Categoria B'
          },
        ];
        return of(mockProducts);
      }
}
