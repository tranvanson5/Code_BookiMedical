import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject, takeUntil } from "rxjs";
import { Utils } from "src/app/core";
import { ForgotPasswordReq, OtpService } from "src/app/module/otp";
import { SpinnerService } from "src/app/module/shared";

@Component({
    selector: 'app-confirm-otp',
    templateUrl: './confirm-otp.component.html',
    standalone: true,
    styleUrls: ['../../../../../login.template.scss'],
    imports: [
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class ConfirmOtpComponent implements OnInit, OnDestroy {

    @Input()
    public forgotPassword: ForgotPasswordReq;

    @Output()
    public confirmSuccess = new EventEmitter<string>();

    public formGroup: FormGroup;

    private readonly destroy$ = new Subject<void>();
    private readonly fb = inject(FormBuilder);
    private readonly spinnerService = inject(SpinnerService);
    private readonly toastrService = inject(ToastrService);
    private readonly otpService = inject(OtpService);

    public get formControl() {
        return this.formGroup.controls;
    }

    public ngOnInit(): void {
        if (!this.forgotPassword) {
            throw new Error('ConfirmOtpComponent needs forgotPassword input');
        }
        this.formGroup = this.fb.group({
            username: [this.forgotPassword.username, [Validators.required]],
            email: [this.forgotPassword.email, [Validators.required]],
            otp: [null, [Validators.required]]
        })
    }

    public ngSubmitForm(): void {
        Utils.beforeSubmitFormGroup(this.formGroup);
        if (this.formGroup.invalid) {
            this.toastrService.error('Thông tin không hợp lệ.')
            return;
        }
        this.spinnerService.showLoading();
        this.otpService.confirmOtp(this.formGroup.value)
            .pipe(takeUntil(this.destroy$))
            .subscribe(res => {
                this.spinnerService.hideLoading();
                this.toastrService.success('Xác nhận OTP thành công.');
                this.confirmSuccess.emit(this.formControl.otp.value);
            })
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}