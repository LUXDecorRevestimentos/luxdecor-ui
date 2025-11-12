import { Injectable } from "@angular/core";
import { environment } from "../../../enviroments/enviroment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ClientService } from "../../service/client.service";
import { Observable } from "rxjs";
import { TaxInfo } from "../data/tax.data";


@Injectable({
    providedIn: 'root'
})
export class TaxAuthService {
    private apiUrl = environment.apiUrl;
    constructor(private http: HttpClient,
        private clientService: ClientService
    ) {}

    getTaxList(): Observable<TaxInfo[]> {
        let token = this.clientService.getCurrentUser()?.idToken;
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.post<TaxInfo[]>(`${this.apiUrl}/admin/tax/list`,
            {headers});
    }

    saveTax(tax: TaxInfo): Observable<any> {
        let token = this.clientService.getCurrentUser()?.idToken;
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        const body = {
            'tax': tax
        }
        return this.http.post<any>(`${this.apiUrl}/admin/tax/update`, {body},
            {headers});
    }   


}