import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { OrderCardData, OrderStatus } from "../data/card.data";

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
            },
            {
                id: 4,
                title: 'Piso Laminado Eucafloor New Evidence Click',
                type: 'Piso Laminado',
                imageUrl: 'piso.png',
                price: 'R$ 192,50',
                amount: 1,
                select: false,
                date: currentDate,
                lastUpdate: currentDate,
                status: OrderStatus.FINISHED
            },
            {
                id: 5,
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
                id: 6,
                title: 'Piso Laminado Eucafloor New Evidence Click',
                type: 'Piso Laminado',
                imageUrl: 'piso.png',
                price: 'R$ 192,50',
                amount: 1,
                select: false,
                date: currentDate,
                lastUpdate: currentDate,
                status: OrderStatus.FINISHED
            },
            {
                id: 7,
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
                id: 8,
                title: 'Piso Laminado Eucafloor New Evidence Click',
                type: 'Piso Laminado',
                imageUrl: 'piso.png',
                price: 'R$ 192,50',
                amount: 1,
                select: false,
                date: currentDate,
                lastUpdate: currentDate,
                status: OrderStatus.FINISHED
            },
            {
                id: 9,
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
                id: 10,
                title: 'Piso Laminado Eucafloor New Evidence Click',
                type: 'Piso Laminado',
                imageUrl: 'piso.png',
                price: 'R$ 192,50',
                amount: 1,
                select: false,
                date: currentDate,
                lastUpdate: currentDate,
                status: OrderStatus.FINISHED
            },
            {
                id: 11,
                title: 'Piso Laminado Eucafloor New Evidence Click',
                type: 'Piso Laminado',
                imageUrl: 'piso.png',
                price: 'R$ 192,50',
                amount: 1,
                select: false,
                date: currentDate,
                lastUpdate: currentDate,
                status: OrderStatus.FINISHED
            },
            {
                id: 12,
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
                id: 13,
                title: 'Piso Laminado Eucafloor New Evidence Click',
                type: 'Piso Laminado',
                imageUrl: 'piso.png',
                price: 'R$ 192,50',
                amount: 1,
                select: false,
                date: currentDate,
                lastUpdate: currentDate,
                status: OrderStatus.FINISHED
            },
            {
                id: 14,
                title: 'Piso Laminado Eucafloor New Evidence Click',
                type: 'Piso Laminado',
                imageUrl: 'piso.png',
                price: 'R$ 192,50',
                amount: 1,
                select: false,
                date: currentDate,
                lastUpdate: currentDate,
                status: OrderStatus.UNDERWAY
            }
        ];

        return of(mockCards);
    }
}
