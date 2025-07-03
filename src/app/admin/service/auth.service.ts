import { CSP_NONCE, Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { ManagerTable } from "../../data/table.data";
import { environment } from "../../../enviroments/enviroment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { ClientService } from "../../service/client.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    private clientService: ClientService) {}

  
  getClient(): Observable<{ isAdmin: boolean }> {
    const token = this.clientService.getCurrentUser()?.idToken;
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });  
      return this.http.get<{ isAdmin: boolean }>(`${this.apiUrl}/admin/validate`, { headers });
    }
    return of({ isAdmin: false });
  }

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