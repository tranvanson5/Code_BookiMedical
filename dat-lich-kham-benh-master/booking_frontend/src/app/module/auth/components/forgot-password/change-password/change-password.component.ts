import { Component, Input, OnInit, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subject, takeUntil } from "rxjs";
import { Utils } from "src/app/core";
import { ConfirmOtpReq, OtpService } from "src/app/module/otp";
import { SpinnerService } from "src/app/module/shared";

@Component({
    selector: 'app-change-password-otp',
    templateUrl: './change-password.component.html',
    standalone: true,
    styleUrls: ['../../../../../login.template.scss'],
    imports: [
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class ChangePasswordOtpComponent implements OnInit {

    @Input()
    confirmOtp: ConfirmOtpReq;

    public formGroup: FormGroup;

    private readonly destroy$ = new Subject<void>();
    private readonly fb = inject(FormBuilder);
    private readonly spinnerService = inject(SpinnerService);
    private readonly toastrService = inject(ToastrService);
    private readonly otpService = inject(OtpService);
    private readonly router = inject(Router);

    public get formControl() {
        return this.formGroup.controls;
    }

    public ngOnInit(): void {
        if (!this.confirmOtp) {
            throw new Error('ChangePasswordOtpComponent needs confirmOtp input');
        }
        this.formGroup = this.fb.group({
            username: [this.confirmOtp.username, [Validators.required]],
            email: [this.confirmOtp.email, [Validators.required]],
            otp: [this.confirmOtp.otp, [Validators.required]],
            newPassword: [null, [Validators.required]],
            confirmPassword: [null, [Validators.required]]
        })
    }

    public ngSubmitForm(): void {
        Utils.beforeSubmitFormGroup(this.formGroup);
        if (this.formGroup.invalid) {
            this.toastrService.error('Thông tin không hợp lệ.')
            return;
        }
        const value = this.formGroup.value;
        if (value.newPassword !== value.confirmPassword) {
            this.toastrService.error('Xác nhận mật khẩu không đúng!');
            return;
        }
        this.spinnerService.showLoading();
        this.otpService.changePassword(value)
            .pipe(takeUntil(this.destroy$))
            .subscribe(res => {
                this.spinnerService.hideLoading();
                this.toastrService.success('Đổi mật khẩu thành công');
                this.router.navigate(['/auth', 'login']);
            })
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}