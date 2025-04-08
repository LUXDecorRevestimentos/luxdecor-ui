import { Routes } from '@angular/router';
import { AdminComponent } from '../../admin/admin.component';
import { DashboardComponent } from '../../admin/dashboard/dashboard.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
    ]
  }
];