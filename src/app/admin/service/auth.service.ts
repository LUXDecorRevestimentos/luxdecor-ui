import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ManagerTable } from "../../data/table.data";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
  constructor() {}

  getManagerTable(): Observable<ManagerTable[]> {
    const clientTable: ManagerTable[] = [
      {
        adminId: '00001',
        name: 'Calzoni Pepperoni',
        email: 'cliente@um.com',
        phone: '1234567890',
        date: '12/07/2025',
        lastAccess: '12/07/2025'
      },
      {
        adminId: '00001',
        name: 'Calzoni Pepperoni',
        email: 'cliente@um.com',
        phone: '1234567890',
        date: '12/07/2025',
        lastAccess: '12/07/2025'
      },
      {
        adminId: '00001',
        name: 'Calzoni Pepperoni',
        email: 'cliente@um.com',
        phone: '1234567890',
        date: '12/07/2025',
        lastAccess: '12/07/2025'
      }
    ];
    return of(clientTable);
  }
}