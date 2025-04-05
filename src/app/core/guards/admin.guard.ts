import { CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';
// import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const adminGuard: CanMatchFn = () => {
//   const authService = inject(AuthService);
  const router = inject(Router);

//   if (authService.isAdmin()) {
//     return true;
//   }
  // return router.createUrlTree(['/']); // Redireciona se não for admin
  return true;  
};
