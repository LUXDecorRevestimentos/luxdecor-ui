import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ClientData } from "../data/client.data";
import { ClientTable } from "../../data/table.data";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../enviroments/enviroment";
import { ClientService } from "../../service/client.service";

@Injectable({
    providedIn: 'root'
})
export class ClientAuthService {
  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient,
    private clientService: ClientService) {}

  currentDate = new Date().toISOString();
  

  getClientData(client_id: string): Observable<ClientData> {
    let token = this.clientService.getCurrentUser()?.idToken
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });  

    const body = { client_id: client_id }

    return this.http.post<ClientData>(`${this.apiUrl}/admin/client/info`, 
      body,
      { headers });
  }

  getClientChart(time: string): Observable<any>{
    let token = this.clientService.getCurrentUser()?.idToken
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const body = { time: time };

    return this.http.post<any>(
      `${this.apiUrl}/admin/client/chart`,
      body,
      { headers });
  }

  getClientTable(): Observable<ClientTable[]> {
    let token = this.clientService.getCurrentUser()?.idToken
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ClientTable[]>(
      `${this.apiUrl}/admin/client/table`,
      { headers });
  }
}

