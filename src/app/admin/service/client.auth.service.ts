import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ClientData } from "../data/client.data";
import { ClientTable } from "../../data/table.data";

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

  getClientTable(): Observable<ClientTable[]> {
    const clientTable: ClientTable[] = [
      {
        clientId: '00001',
        name: 'Calzoni Pepperoni',
        email: 'cliente@um.com',
        phone: '1234567890',
        date: '12/07/2025'
      },
      {
        clientId: '00001',
        name: 'Calzoni Pepperoni',
        email: 'cliente@um.com',
        phone: '1234567890',
        date: '12/07/2025'
      },
      {
        clientId: '00001',
        name: 'Calzoni Pepperoni',
        email: 'cliente@um.com',
        phone: '1234567890',
        date: '12/07/2025'
      }
    ];
    return of(clientTable);
  }
}

