import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, tap } from "rxjs";
import { AccountService } from "src/app/module/account/services/account.service";
import { SpinnerService } from "src/app/module/shared/spinner/services/spinner.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private readonly router = inject(Router);
    private readonly toastrService = inject(ToastrService);
    private readonly spinnerService = inject(SpinnerService);
    private readonly accountService = inject(AccountService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.accountService.getCurrentUser();
        if (user) {
            let headers = new HttpHeaders();
            headers = headers.append('Authorization', 'Bearer ' + user.jwt);
            req = req.clone({
                headers: headers
            })
        }
        
        return next.handle(req)
            .pipe(
                tap({
                    next: req => {
                        
                    },
                    error: (error: HttpErrorResponse) => {
                        this.spinnerService.hideLoading();
                        if (error.status === 401 || error.status === 403) {
                            this.toastrService.error('Bạn cần đăng nhập để thực hiện.');
                            this.router.navigate(['auth', 'login']);
                            localStorage.removeItem('secret');
                            return;
                        }
                        const { messages } = error.error;
                        this.toastrService.error(messages.join('</br>') || 'Có lỗi xảy ra trong quá trình thực hiện.')
                    }
                })
            )
    }
}