import { Component, ViewChild } from '@angular/core';
import { SidenavComponent } from './components/sidenav-component/sidenav-component.component';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';

@Component({
  selector: 'app-admin',
  imports: [SidenavComponent, CommonModule, DashboardComponent, OrdersComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  @ViewChild(SidenavComponent) sidenav!: SidenavComponent;
  contentToDisplay: string = 'dashboard';

  ngOnInit(): void {
    console.log('Admin component initialized');
    this.handleButtonClick('dashboard');
  }

  handleButtonClick(identifier: string) {
    this.contentToDisplay = identifier;
    console.log('Sidenav:', identifier)
  }
}
