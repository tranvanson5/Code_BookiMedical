import { Component, inject } from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Utils } from "src/app/core/utils/Utils";
import { AccountService } from "../../services/account.service";
import { SpinnerService } from "src/app/module/shared/spinner/services/spinner.service";
import { ChangePassword } from "../../models/password.model";
import { ModalService } from "src/app/core/services/modal.service";
import { AuthService } from "src/app/core/services/auth.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class ChangePasswordComponent {

    private readonly fb = inject(FormBuilder);
    private readonly authService = inject(AuthService);
    private readonly toastsService = inject(ToastrService);
    private readonly accountService = inject(AccountService);
    private readonly spinnerService = inject(SpinnerService);
    private readonly modal = inject(ModalService);
    private readonly modalActive = inject(NgbActiveModal);

    public formGroup = this.fb.group({
        password: [null, [Validators.required, Validators.minLength(8)]],
        newPassword: [null, [Validators.required, Validators.minLength(8)]],
        confirmationPassword: [null, [Validators.required, Validators.minLength(8)]]
    });

    public get formControl() {
        return this.formGroup.controls;
    }

    public ngOnSubmitForm(): void {
        Utils.beforeSubmitFormGroup(this.formGroup);
        if (this.formGroup.invalid) {
            this.toastsService.success('Thông tin không hợp lệ.');
            return;
        }
        const value = this.formGroup.value as Partial<ChangePassword> as ChangePassword;
        if (value.newPassword !== value.confirmationPassword) {
            this.toastsService.error('Xác nhận mật khẩu thất bại.');
            return;
        }
        this.spinnerService.showLoading();
        this.accountService.changePassword(value)
            .subscribe(res => {
                this.modalActive.close();
                this.spinnerService.hideLoading();
                this.toastsService.success('Đổi mật khẩu thành công');
                this.modal.openConfirmPopup({
                    title: 'Thông báo',
                    content: 'Bạn phải đăng xuất để cập nhật thông tin',
                    withReason: false
                })
                .dismissed
                .subscribe(res => {
                    if (res) {
                        this.authService.logout().subscribe()
                    }
                })

            })
    }
}