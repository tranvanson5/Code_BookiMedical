import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { SpinnerService } from 'src/app/module/shared/spinner/services/spinner.service';

@Component({
    selector: 'main-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class MainHeaderComponent {

    private authService = inject(AuthService);
    private toastService = inject(ToastrService);
    private spinnerService = inject(SpinnerService);

    public authenticated = this.authService.authenticated;

    public logout(): void {
        this.spinnerService.showLoading();
        this.authService.logout()
            .subscribe(res => {
                this.toastService.success('Đăng xuất thành công!');
                this.spinnerService.hideLoading();
            })
    }
}