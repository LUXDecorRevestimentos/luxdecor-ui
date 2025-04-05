import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { OrderDetailsTable } from '../../data/table.data';

@Injectable({
    providedIn: 'root'
})
export class OrderAuthService {
    constructor() {}

     getOrderData(): Observable<OrderDetailsTable[]> {
            const currentDate = new Date().toISOString();
            const mockCards: OrderDetailsTable[] = [
                {
                    orderId: 1,
                    status: 'Underway',
                    date: currentDate
                },
                {
                    orderId: 2,
                    status: 'Completed',
                    date: currentDate
                },
                {
                    orderId: 3,
                    status: 'Pending',
                    date: currentDate
                },
                {
                    orderId: 4,
                    status: 'Cancelled',
                    date: currentDate
                },
                {
                    orderId: 5,
                    status: 'On Hold',
                    date: currentDate
                }
            ];
        return of(mockCards);
        }
}
