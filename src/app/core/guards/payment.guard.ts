import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaymentGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const navigation = this.router.getCurrentNavigation();
    const hasCartData = navigation?.extras.state?.['cartData'];
    
    const hasCartId = route.queryParamMap.has('cartId');

    if (hasCartData || hasCartId) {
      return true;
    }
    this.router.navigate(['/cart']);
    return false;
  }
}