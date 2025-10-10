import { Injectable } from "@angular/core";
import { environment } from "../../enviroments/enviroment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ClientService } from "./client.service";
import { delay, finalize, from, map, Observable, of, switchMap } from "rxjs";
import { PaymentBankSlip, PaymentCard, PaymentCredit, PaymentDebit, PaymentPixResponse, SaleDataCart, threeDSRequest, ThreeDSSession } from "../data/payment.data";
import { PaymentMethodType } from "../data/card.data";
import { PagBankService } from "./pagbank.service";
import { LoadingService } from "../shared/loading/loading.service";


@Injectable({
    providedIn: 'root'
}) export class PaymentService {

    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient,
        private clientService: ClientService,
        private pagBankService: PagBankService,
        private loadingService: LoadingService
    ) {}

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

    generatePaymentBankSlip(cart_id: string): Observable<PaymentBankSlip> {
        let token = this.clientService.getCurrentUser()?.idToken;
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        const body = {
            "cart_id": cart_id,
            "payment_type": PaymentMethodType.BOLETO
        }

        return this.http.post<PaymentBankSlip>(`${this.apiUrl}/payment/order/create`, body, { headers })
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

    public processDebitCardPayment(debitCardFormData: PaymentDebit, cart_id: string) {
        return from(this.pagBankService.initializePagBank()).pipe(
            switchMap(() => from(this.pagBankService.encryptCardData(debitCardFormData.card))),
            switchMap(cardToken => {
                debitCardFormData.encrypted = `${cardToken}`
                const body = {
                    "cart_id": cart_id,
                    "payment_type": PaymentMethodType.DEBIT_CARD,
                    "details": {
                        "encrypted": debitCardFormData.encrypted,
                    }
                }
                let token = this.clientService.getCurrentUser()?.idToken;
                const headers = new HttpHeaders({
                    'Authorization': `Bearer ${token}`
                })
                return this.http.post(`${this.apiUrl}/payment/order/create`, body, { headers })
            })
        )
    }


    public processDebitCardPaymentWith3DS(debitCardFormData: PaymentDebit, cart_id: string, totalValue: number): Observable<any> {
        return from(this.pagBankService.initializePagBank()).pipe(
            switchMap(() => from(this.pagBankService.encryptCardData(debitCardFormData.card))),
            switchMap(cardToken => {
                debitCardFormData.encrypted = `${cardToken}`
                return this.pagBankService.generateThreeDSRequest(
                    debitCardFormData.card, totalValue
                );
            }),
            switchMap(threeDSResult => {
                console.log(threeDSResult)
                if (threeDSResult.status === "AUTH_FLOW_COMPLETED") {
                    return of(threeDSResult.id); 
                } else {
                    return this.pagBankService.getSessionId().pipe(
                        map(result => result.session));
                }
            }),
            switchMap((threedsIdValue: string) => {  
                console.log(threedsIdValue)              
                const body = {
                    "cart_id": cart_id,
                    "payment_type": PaymentMethodType.DEBIT_CARD,
                    "details": {
                        "encrypted": debitCardFormData.encrypted,
                        "threedsId": threedsIdValue
                    }
                };
                
                let token = this.clientService.getCurrentUser()?.idToken;
                const headers = new HttpHeaders({
                    'Authorization': `Bearer ${token}`
                });
                
                return this.http.post(`${this.apiUrl}/payment/order/create`, body, { headers });
            })
        );
    }

} 
 