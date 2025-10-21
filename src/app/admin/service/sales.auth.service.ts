import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SalesTable } from '../../data/table.data';
import { ClientService } from '../../service/client.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../enviroments/enviroment';
import { InstallOption, PaymentMethodType } from '../../data/card.data';

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
 
  postPayment(cart_id: string, install_list: InstallOption[], delivery: boolean, payment_method: PaymentMethodType): Observable<any> {
    let token = this.clientService.getCurrentUser()?.idToken
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const body = { cart_id: cart_id,
                   install_list: install_list,
                   delivery_bool: delivery,
                   payment_method: payment_method
                  }

    return this.http.post<any>(`${this.apiUrl}/sales/finalization`, 
      body,
      { headers });
  }

  getPayment(cart_id: string) {
      let token = this.clientService.getCurrentUser()?.idToken;
      const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
      });
      const body = {
          "cart_id": cart_id,
      }
      return this.http.post<any>(`${this.apiUrl}/sales`, 
          body, {headers})
  }
}
