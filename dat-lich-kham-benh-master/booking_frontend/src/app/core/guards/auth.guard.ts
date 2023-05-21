import { Router, UrlTree } from '@angular/router';
import { Injectable, inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.authService.authenticated) {
            return true;
        }
        this.router.navigate(['auth', 'login']);
        return false;
    }
}