import { ElementRef, Injectable, OnInit } from "@angular/core";
import { environment } from "../../enviroments/enviroment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ClientService } from "./client.service";
import { Observable, of, switchMap } from "rxjs";
import { error } from "console";
import { PaymentCard, ThreeDSSession } from "../data/payment.data";

declare const PagSeguro: any;

@Injectable({
    providedIn: 'root'
}) export class PagBankService {

    private apiUrl = environment.apiUrl;
    private pbEnv = environment.pbEnv;
    private scriptLoaded = false;
    private scriptUrl = 'https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js';

    private threeDSData: ThreeDSSession | undefined;

    constructor(private http: HttpClient,
        private clientService: ClientService) {}
    
    private loadScript(): Observable<boolean>{
        if (this.scriptLoaded) {
            return of(true);
        }
        return new Observable<boolean> (observer => {
            const script = document.createElement('script');
            script.src = this.scriptUrl;
            script.onload = () => {
                this.scriptLoaded = true;
                observer.next(true);
                observer.complete();
            };
            script.onerror = () => {
                observer.error('Falha ao carregar o script do PagBank');
            };
            document.head.appendChild(script);
        });
    }

    public getSessionId(): Observable <ThreeDSSession> {
        let token = this.clientService.getCurrentUser()?.idToken;
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<ThreeDSSession>(`${this.apiUrl}/payment/threeds`, {headers})
    }

    public initializePagBank(): Observable<void> {
        return this.loadScript().pipe(
            switchMap(() => this.getSessionId()),
            switchMap(sessionData => {
                const sessionId = sessionData.session;
                this.threeDSData = sessionData;
                console.log(this.threeDSData)
                return new Observable<void>((observer) => {
                    if (typeof PagSeguro !== 'undefined') {
                        observer.next();
                        observer.complete();
                    } else {
                        observer.error('SDK PagBank não disponível após carregamento');
                    }
                });
            })
        );
    }

     public encryptCardData(paymentCard: PaymentCard): Promise<string | null> {
        return new Promise((resolve, reject) => {
            const cardData = {
                publicKey: this.threeDSData!.public_key,
                holder: paymentCard.holder.name,
                number: paymentCard.number,
                expMonth: paymentCard.expMonth,
                expYear: paymentCard.expYear,
                securityCode: paymentCard.cvv
            };

            const encryptedCardResult = PagSeguro.encryptCard(cardData);

            if (encryptedCardResult.hasErrors) {
                resolve(null); 
            } else {
                const cardToken = encryptedCardResult.encryptedCard; 
                resolve(cardToken);
            }
        });
    }

}

