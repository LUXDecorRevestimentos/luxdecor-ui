import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, from, map, mergeMap, Observable, of, tap, toArray } from "rxjs";
import { CartCardItemData, CartData, CartResponseItem } from "../data/card.data";
import { ProductService } from "./product.service";
import { ClientService } from "./client.service";
import { environment } from "../../enviroments/enviroment";

@Injectable({
    providedIn: 'root'
  })
  export class CartService {
    private apiUrl = environment.apiUrl;
  
    constructor(private http: HttpClient,
      private productService: ProductService,
      private clientService: ClientService) { }
  
    getCart(): Observable<CartData> {
      let token = this.clientService.getCurrentUser()?.idToken
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get<CartData>(`${this.apiUrl}/cart`, { headers });
    }

    getCartId(cart_id: string): Observable<CartData> {
      let token = this.clientService.getCurrentUser()?.idToken
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      const body = {
        "cart_id": cart_id 
      }

      return this.http.post<CartData>(`${this.apiUrl}/cart/id`, body, { headers });
    }

    getLocalCartItems() {

      const localCart = JSON.parse(
        localStorage.getItem('temp_cart') || '[]'
      );

      return localCart;
    }

    transformLocalCartItems(localCart: any[]) {

      if (!localCart.length) {
        return of([]);
      }

      return forkJoin(
        localCart.map(item =>
          this.productService.getProductId(item.product_id).pipe(

            map(product => {
              const rawPrice = (product.price as any)?.unitary ?? '0,00';

              const price = Number(
                String(rawPrice ?? 0)
                  .replace('.', '')
                  .replace(',', '.')
              );

              return {
                product_id: product.product_id,
                title: product.title,
                price: rawPrice,
                imageUrl: product.imgs?.[0] || '',
                quantity: item.quantity,
                total_price: price * item.quantity,
                type: product.price_type || '',
                select: false
              };
            })
          )
        )
      );
    }

    transformToCardItems(cartData: CartData): Observable<CartCardItemData[]> {
      if (!cartData.orders || cartData.orders.length === 0) {
        return of([]);
      }
      return from(cartData.orders).pipe(
        mergeMap(order => this.transformOrderItem(order)),
        toArray()
      );
    }
  
    private transformOrderItem(order: CartResponseItem): Observable<CartCardItemData> {
      return this.productService.getImgs(order.product_id).pipe(
        tap(imageUrl => {}),
        map(imageUrl => ({
          id: order.order_id,
          product_id: order.product_id,
          title: order.product_title,
          type: 'product',
          imageUrl: imageUrl[0].src, 
          price: order.product_price,
          amount: order.amount,
          select: true
        }))
      );
    }

    addOrder(productId: string, amount: number) {
      let token = this.clientService.getCurrentUser()?.idToken
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.http.post(
        `${this.apiUrl}/order/add`,
        { product_id: productId, amount: amount },
        { headers }
      );
    }

    updateOrder(orderId: string, productId: string, amount: number): Observable<any> {
      let token = this.clientService.getCurrentUser()?.idToken
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.http.post(
        `${this.apiUrl}/order/update`,
        { product_id: productId,
          order_id: orderId,
          amount: amount},
        { headers }
      );
    }

    removeOrder(order_id: string): Observable<any> {
      let token = this.clientService.getCurrentUser()?.idToken
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.http.post(
        `${this.apiUrl}/order/remove`,
        { order_id: order_id },
        { headers }
      );
    }

  }