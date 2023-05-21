import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginModel } from "../models/login.model";
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { LoginResponse } from "../models/login-response.model";
import { ToastrService } from "ngx-toastr";
import { SpinnerService } from "src/app/base/core/services/spinner.service";
import { decode, encode } from 'js-base64';
import { Authority } from 'src/app/base/core/models/menu.model';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    API: string = `${environment.API_GATEWAY_USER}/auth`;

    constructor(
        private http: HttpClient,
        private toastrService: ToastrService,
        private spinnerService: SpinnerService,
        private router: Router
    ) {}

    public isAuthorization(authorities: Authority[]): boolean {
        const user = JSON.parse(decode(localStorage.getItem('user')));
        return !!authorities.filter(auth => {
            return !!user.authoritiesList.find(x => x.code == auth);
        }).length;
    }

    login(user: LoginModel): Observable<LoginResponse> {
        this.spinnerService.isLoading(true);
        return this.http
            .post<LoginResponse>(`${this.API}/login`, user)
            .pipe(
                tap(res => {
                    localStorage.setItem('jwt', res.jwt);
                    if (res.user.authoritiesList.every(x => x.code !== Authority.ADMIN && x.code !== Authority.MANAGER)) {
                        this.logout();
                        this.toastrService.error('Bạn không có quyền.');
                        return;
                    }
                    if (res.user.authoritiesList.every(x => x.code !== Authority.ADMIN) && !res.user.departments.length) {
                        this.logout();
                        this.toastrService.error('Bạn chưa được phân công quản lý chi nhánh.');
                        return;
                    }
                    localStorage.setItem('user', encode(JSON.stringify(res.user)));
                    this.spinnerService.isLoading(false);
                    this.toastrService.success('Đăng nhập thành công');
                    this.router.navigate(['appointment']);
                })
            );
    }
    logout(): void {
        this.spinnerService.isLoading(true);
        this.http.post(`${this.API}/logout`, {})
            .subscribe(res => {
                this.spinnerService.isLoading(false);
                localStorage.removeItem('jwt');
                localStorage.removeItem('user');
                this.router.navigate(['auth', 'login'])
            })
    }
}