import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


export interface Notification {
  message: string;
  type: 'success' | 'error';
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
    private messageSubject = new BehaviorSubject<Notification | null>(null);
    message$ = this.messageSubject.asObservable();

    show(message: string, type: 'success' | 'error') {
        this.messageSubject.next({ message, type });
        setTimeout(() => this.clear(), 3000);
    }

    clear() {
        this.messageSubject.next(null);
    }
}