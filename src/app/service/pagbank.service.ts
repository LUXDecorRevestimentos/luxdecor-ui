import { ElementRef, Injectable, OnInit } from "@angular/core";
import { environment } from "../../enviroments/enviroment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ClientService } from "./client.service";
import { from, Observable, of, switchMap } from "rxjs";
import { error } from "console";
import { PaymentCard, threeDSRequest, ThreeDSSession } from "../data/payment.data";

declare const PagSeguro: any;

interface ThreeDSResult {
    status: string;
    id: string;
    session: string;
}

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
                this.threeDSData = sessionData;
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

    public authenticate3DS(threeDSRequest: any): Observable<any> {
        if (typeof PagSeguro === 'undefined' || !PagSeguro.authenticate3DS) {
            return from(Promise.reject(new Error("PagBank SDK ou PagSeguro.authenticate3DS não está disponível.")));
        }
        const authPromise = PagSeguro.authenticate3DS(threeDSRequest);
        return from(authPromise);
    }

    public generateThreeDSRequest(paymentCard: PaymentCard, value: number): Observable<ThreeDSResult> {

        if (!this.threeDSData || !this.threeDSData.session) {
            return from(Promise.reject(new Error("PagBank não inicializado ou Session ID ausente.")));
        }

        const sessionId = this.threeDSData.session;
        const pbEnv = this.pbEnv;

        const buildThreeDSRequest = (clientData: any, paymentCard: PaymentCard, value: number) => {
            
            const customerName = `${clientData.name} ${clientData.surname}`;
            const phone = clientData.contact.phone.replace(/\D/g, '');
            const phoneNumber = phone.length > 2 ? phone.substring(2) : phone;
            const phoneArea = phone.length > 2 ? phone.substring(0, 2) : '11'; 

            return {
                "data": {
                    customer: {
                        name: customerName,
                        email: clientData.contact.email,
                        phones: [{
                            country: '55',
                            area: phoneArea,
                            number: phoneNumber,
                            type: 'MOBILE'
                        }]
                    },
                    paymentMethod: {
                        type: 'DEBIT_CARD',
                        installments: 1,
                        card: {
                            number: paymentCard.number,
                            expMonth: paymentCard.expMonth,
                            expYear: paymentCard.expYear,
                            holder: {
                                name: customerName,
                            }
                        }
                    },
                    amount: {
                        value: 2503,
                        currency: 'BRL' 
                    },
                    shippingAddress: {
                        street: clientData.address.street,
                        number: clientData.address.number,
                        complement: clientData.address.complement || "-",
                        regionCode: "SP",
                        country: 'BRA',
                        city: "São Paulo",
                        postalCode: clientData.address.postal_code 
                    },
                    billingAddress: {
                        street: clientData.address.street,
                        number: clientData.address.number,
                        complement: clientData.address.complement || "-",
                        regionCode: "SP", 
                        country: 'BRA',
                        city: "São Paulo",
                        postalCode: clientData.address.postal_code 
                    },
                    dataOnly: false
                }
            };
        };

        return from(this.clientService.getClient()).pipe(
            switchMap(clientData => {
                const threeDSRequest = buildThreeDSRequest(clientData, paymentCard, value);

                return new Observable<ThreeDSResult>(observer => {
                    PagSeguro.setUp({
                        session: sessionId,
                        env: pbEnv
                    })

                    PagSeguro.authenticate3DS(threeDSRequest)
                        .then((result: ThreeDSResult) => {
                            if(result){
                                result.session = this.threeDSData?.session ?? ''; 
                            }
                            observer.next(result);
                            observer.complete();
                        })
                        .catch((err: any) => {
                            if (err instanceof PagSeguro.PagSeguroError) {
                                console.error('Detalhe do Erro:', err.detail);
                                observer.error(err); 
                            } else {
                                observer.error(err);
                            }
                        });

                    return () => {};
                });
            })
        );
    }
}

