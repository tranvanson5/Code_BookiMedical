import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, of, tap, throwError } from "rxjs";
import { SpinnerService } from "./spinner.service";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/auth/services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private spinnerService: SpinnerService,
        private toastrService: ToastrService,
        private authService: AuthService,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwt = window.localStorage.getItem('jwt');
        if (jwt) {
            req = req.clone({
                setHeaders: {
                    'Authorization': `Bearer ${jwt}`,
                }
            })
        }

        return next.handle(req).pipe(
            tap({
                next: req => {},
                error: (e: HttpErrorResponse) => {
                    this.toastrService.error(e?.error.messages?.join('</br>') ?? 'Có lỗi xử lý.');
                    this.spinnerService.isLoading(false);
                }
            }),
            catchError((error) => {
                if (error.status === 403 || error.status === 401) {
                    this.router.navigate(['auth', 'login'])
                }
                return throwError(() => error);
            })
        );
    }

}