import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Utils } from 'src/app/core';
import { SpinnerService } from 'src/app/module/shared/spinner/services/spinner.service';
import { FormWrapperComponent } from '../form-wrapper/form-wrapper.component';
import { ToastrService } from 'ngx-toastr';
import { OtpService } from 'src/app/module/otp';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmOtpComponent } from './confirm-otp/confirm-otp.component';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangePasswordOtpComponent } from './change-password/change-password.component';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['../../../../login.template.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        FormWrapperComponent,
        RouterLink,
        NgIf,
        ConfirmOtpComponent,
        ChangePasswordOtpComponent,
        NgTemplateOutlet
    ],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

    public formGroup: FormGroup;
    public step: number = 1;

    private readonly destroy$ = new Subject<void>();
    private readonly fb = inject(FormBuilder);
    private readonly spinnerService = inject(SpinnerService);
    private readonly toastrService = inject(ToastrService);
    private readonly otpService = inject(OtpService);

    public get formControl() {
        return this.formGroup.controls;
    }

    public ngOnInit(): void {
        this.formGroup = this.fb.group({
            username: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]],
            otp: [null]
        })
    }

    public ngSubmitForm(): void {
        Utils.beforeSubmitFormGroup(this.formGroup);
        if (this.formGroup.invalid) {
            this.toastrService.error('Thông tin không hợp lệ!')
            return;
        }
        this.spinnerService.showLoading();
        this.otpService.forgotPassword(this.formGroup.value)
            .pipe(takeUntil(this.destroy$))
            .subscribe(res => {
                this.toastrService.success('OTP đã được gửi về email của bạn. Vui lòng kiếm tra.');
                this.spinnerService.hideLoading();
                this.step = 2;
            })
    }

    public confirmOtpSuccess(otp: string): void {
        this.formGroup.get('otp')?.setValue(otp);
        this.step = 3;
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}