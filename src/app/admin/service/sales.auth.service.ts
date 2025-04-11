import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SalesTable } from '../../data/table.data';

@Injectable({
  providedIn: 'root' 
})
export class SalesAuthService {
  constructor() { }

  getSalesTable(): Observable<SalesTable[]> {
    const salesTable: SalesTable[] = [
      { saleId: '0001', orderId: 'P001', clientId: 'C001', value: '50.00', date: '2023-01-01' },
      { saleId: '0002', orderId: 'P002', clientId: 'C002', value: '60.00', date: '2023-01-02' },
    ];
    return of(salesTable);
  }

}
