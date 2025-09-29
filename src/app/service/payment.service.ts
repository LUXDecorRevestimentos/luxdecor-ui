import { Injectable } from "@angular/core";
import { environment } from "../../enviroments/enviroment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ClientService } from "./client.service";
import { Observable } from "rxjs";
import { PaymentPixResponse, SaleDataCart } from "../data/payment.data";


@Injectable({
    providedIn: 'root'
}) export class PaymentService {

    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient,
        private clientService: ClientService) {}

    getSale(cart_id: string): Observable<SaleDataCart>{
        let token = this.clientService.getCurrentUser()?.idToken;
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        const body = {
            "cart_id": cart_id
        }
        return this.http.post<SaleDataCart>(`${this.apiUrl}/payment/order`, 
            body, {headers})
    }

    generatePaymentPix(cart_id: string): Observable<PaymentPixResponse> {
        let token = this.clientService.getCurrentUser()?.idToken;
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        const body = {
            "cart_id": cart_id
        }
        return this.http.post<PaymentPixResponse>(`${this.apiUrl}/payment/order/create`, 
            body, {headers})
    }

} 


