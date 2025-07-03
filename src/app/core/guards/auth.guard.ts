import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ClientService } from '../../service/client.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private clientService: ClientService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.clientService.getCurrentUser()) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }


}