import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ClientData } from "../data/client.data";

@Injectable({
    providedIn: 'root'
})
export class ClientAuthService {
  constructor() {}
  
  getClientData(): Observable<ClientData> {
    const clientData: ClientData =
    {
      clientId: '00001',
      name: 'Calzoni Pepperoni',
      email: 'cliente@um.com',
      phoneNumber: '1234567890',
      address: 'Endereço Cliente Um',
      imageUrl: 'piso.png',
      amount: 10
    }

    return of(clientData);
  }
}

