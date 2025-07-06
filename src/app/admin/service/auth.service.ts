import { CSP_NONCE, Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { ManagerTable } from "../../data/table.data";
import { environment } from "../../../enviroments/enviroment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { ClientService } from "../../service/client.service";
import { AdminData } from "../data/admin.data";

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

  getAdmin(adminId: string): Observable<AdminData>{
    const token = this.clientService.getCurrentUser()?.idToken;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });  
    const body = { admin_id: adminId }

    return this.http.post<AdminData>(
      `${this.apiUrl}/admin/find`, 
      body, 
      { headers });
  }

  getAdminTable(): Observable<AdminData[]> {
    const token = this.clientService.getCurrentUser()?.idToken;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });  
    return this.http.get<AdminData[]>(`${this.apiUrl}/admin/table`, { headers });
  }

  updateAdmin(newAdminData: AdminData): Observable<AdminData> {
    const token = this.clientService.getCurrentUser()?.idToken;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });  
    return this.http.post<AdminData>(
      `${this.apiUrl}/admin/update`, 
      newAdminData, 
      { headers });
  }

  removeAdmin(adminId: string){
    const token = this.clientService.getCurrentUser()?.idToken;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });  
    const body = { admin_id: adminId }

    this.http.post<AdminData>(
      `${this.apiUrl}/admin/remove`, 
      body, 
      { headers });
  }

  cleanAdmin(): Observable<AdminData> {
    return of({
        adminId: "",
        name: "",
        surname: "",
        email: "",
        phoneNumber: "",
        created_at: ""
    });
}

} 