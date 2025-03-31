import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { OrderCardData, OrderStatus} from "../data/card.data";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor() {}

    getOrderData(): Observable<OrderCardData[]> {
        const currentDate = new Date().toISOString();
        const mockCards: OrderCardData[] = [
        {
            id: 1,
            title: 'Piso Laminado Eucafloor New Evidence Click',
            type: 'Piso Laminado',
            imageUrl: 'piso.png',
            price: 'R$ 192,50',
            amount: 1,
            select: false,
            date: currentDate,
            lastUpdate: currentDate,
            status: OrderStatus.UNDERWAY
        },
        {
            id: 2,
            title: 'Piso Laminado Eucafloor New Evidence Click',
            type: 'Piso Laminado',
            imageUrl: 'piso.png',
            price: 'R$ 192,50',
            amount: 1,
            select: false,
            date: currentDate,
            lastUpdate: currentDate,
            status: OrderStatus.UNDERWAY
        },
        {
            id: 3,
            title: 'Piso Laminado Eucafloor New Evidence Click',
            type: 'Piso Laminado',
            imageUrl: 'piso.png',
            price: 'R$ 192,50',
            amount: 1,
            select: false,
            date: currentDate,
            lastUpdate: currentDate,
            status: OrderStatus.FINISHED
        }
        ];
        return of(mockCards);
    }
}
    