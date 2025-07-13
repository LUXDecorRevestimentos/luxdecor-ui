import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrderDetailsTable, SalesTable } from '../../data/table.data';
import { ClientService } from '../../service/client.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../enviroments/enviroment';
import { InstallOption } from '../../data/card.data';

@Injectable({
  providedIn: 'root' 
})
export class SalesAuthService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient,
    private clientService: ClientService) { }

  getSalesTable(): Observable<SalesTable[]> {
    let token = this.clientService.getCurrentUser()?.idToken
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });  

    return this.http.get<SalesTable[]>(`${this.apiUrl}/admin/sales/table`, 
      { headers });
  }

  getPieChart(select: string): Observable<any[]> {
    let token = this.clientService.getCurrentUser()?.idToken
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const body = { select: select };

    return this.http.post<any>(
      `${this.apiUrl}/admin/sales/chart`,
      body,
      { headers });
  }

  getSalesChart(time: string): Observable<any>{
    let token = this.clientService.getCurrentUser()?.idToken
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const body = { time: time };

    return this.http.post<any>(
      `${this.apiUrl}/admin/sales/chart`,
      body,
      { headers });
  }
 
  postPayment(cart_id: string, install_list: InstallOption[]): Observable<any> {
    let token = this.clientService.getCurrentUser()?.idToken
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });  
    const body = { cart_id: cart_id,
                   install_list: install_list }

    return this.http.post<any>(`${this.apiUrl}/sales/finalization`, 
      body,
      { headers });
  }
}
