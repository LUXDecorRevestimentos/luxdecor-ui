import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Notification, NotificationService } from "../../service/notification.service";

@Component({
    selector: 'app-notification',
    imports: [CommonModule],
    templateUrl: './notification.component.html',
    styleUrl: './notification.component.css'
})

export class NotificationComponent {

  notification: Notification | null = null;

  constructor(private notificationService: NotificationService) {
    this.notificationService.message$.subscribe(notification => {
      this.notification = notification;
    });
  }
}