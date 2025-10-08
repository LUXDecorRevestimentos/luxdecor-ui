import { Injectable } from "@angular/core";
import { environment } from "../../enviroments/enviroment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ClientService } from "./client.service";
import { from, Observable, switchMap } from "rxjs";
import { PaymentCredit, PaymentPixResponse, SaleDataCart, ThreeDSSession } from "../data/payment.data";
import { PaymentMethodType } from "../data/card.data";
import { PagBankService } from "./pagbank.service";


@Injectable({
    providedIn: 'root'
}) export class PaymentService {

    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient,
        private clientService: ClientService,
        private pagBankService: PagBankService) {}

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
            "cart_id": cart_id,
            "payment_type": PaymentMethodType.PIX
        }
        return this.http.post<PaymentPixResponse>(`${this.apiUrl}/payment/order/create`, 
            body, {headers})
    }

    public processCreditCardPayment(creditCardFormData: PaymentCredit, cart_id: string): Observable<any> {
        return from(this.pagBankService.initializePagBank()).pipe(
            switchMap(() => from(this.pagBankService.encryptCardData(creditCardFormData.card))),
            switchMap(cardToken => {
                creditCardFormData.encrypted = `${cardToken}`
                const body = {
                    "cart_id": cart_id,
                    "payment_type": PaymentMethodType.CREDIT_CARD,
                    "details": {
                        "encrypted": creditCardFormData.encrypted,
                        "installments": creditCardFormData.installments
                    }
                }

                let token = this.clientService.getCurrentUser()?.idToken;
                const headers = new HttpHeaders({
                    'Authorization': `Bearer ${token}`
                });
                return this.http.post(`${this.apiUrl}/payment/order/create`, body, { headers });
            })
        )
    }
    
    generatePaymentCredit(cart_id: string, installments: number): Observable<any>{
        let token = this.clientService.getCurrentUser()?.idToken;
        
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        const body = {
            "cart_id": cart_id,
            "installments": installments,
            "payment_type": PaymentMethodType.CREDIT_CARD
        }
        return this.http.post<any>(`${this.apiUrl}/payment/order/create`,
            body, {headers})
    }
} 
 