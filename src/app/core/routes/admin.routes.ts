import { Routes } from '@angular/router';
import { AdminComponent } from '../../admin/admin.component';
import { DashboardComponent } from '../../admin/dashboard/dashboard.component';
import { LoginAdminComponent } from '../../admin/login-admin/login-admin.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', component: AdminComponent },
      { path: 'dashboard', component: DashboardComponent }
    ]
  },
];