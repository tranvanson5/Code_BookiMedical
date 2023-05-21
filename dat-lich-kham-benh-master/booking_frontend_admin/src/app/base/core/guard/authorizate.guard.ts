import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";
import { Authority } from "../models/menu.model";

@Injectable({
    providedIn: 'root',
})
export class AuthorizateGuard implements CanActivate {

    constructor(
        private authService: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const authorities = route.data.authority as Authority[];
        if (!authorities || !authorities.length) {
            return true;
        }
        return this.authService.isAuthorization(authorities);
    }
}