import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { map, of } from "rxjs";
import { ClientService } from "../../service/client.service";
import { Routes } from "../../shared/routing/routes";

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    constructor (
        private clientService: ClientService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return of(route).pipe(
            map((route: ActivatedRouteSnapshot) => {
                let canActivate = true;
                if (this.clientService.canActivate()){
                    this.router.navigate([Routes.CART_ORDERS])
                    canActivate = false
                }
                return canActivate
            })
        )
    }
}