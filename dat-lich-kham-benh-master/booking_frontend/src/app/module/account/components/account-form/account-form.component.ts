import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { InputDateComponent } from "src/app/module/shared";
import { AccountService } from "../../services/account.service";
import { Utils } from "src/app/core/utils/Utils";
import { ToastrService } from "ngx-toastr";
import { SpinnerService } from "src/app/module/shared/spinner/services/spinner.service";
import { Subject, lastValueFrom, takeUntil } from "rxjs";
import { JwtResponse } from "src/app/core/models/jwt.model";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "src/app/core/services/auth.service";
import { ModalService } from "src/app/core/services/modal.service";
import { DataService } from "src/app/core/services/data.service";
import { ResourceService } from "src/app/core/services/resource.service";

@Component({
    selector: 'app-account-form',
    templateUrl: './account-form.component.html',
    styleUrls: ['./account-form.component.scss'],
    standalone: true,
    imports: [
        NgSelectModule,
        InputDateComponent,
        FormsModule,
        ReactiveFormsModule,
        NgbModalModule,
    ]
})
export class AccountFormComponent implements OnInit, OnDestroy {
    
    private readonly destroy$ = new Subject<void>();
    private readonly fb = inject(FormBuilder);
    private readonly authService = inject(AuthService);
    private readonly accountService = inject(AccountService);
    private readonly toastsService = inject(ToastrService);
    private readonly spinnerService = inject(SpinnerService);
    private readonly modal = inject(ModalService);
    private readonly dataService = inject(DataService);
    private readonly resourceService = inject(ResourceService);

    public formGroup: FormGroup = this.fb.group({
        fullName: [null, [Validators.required]],
        phone: [null, [Validators.required]],
        gender: [null, [Validators.required]],
        dob: [null, [Validators.required]],
        address: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        avatar: ['/images/user/default-user.jpg'],
    })

    private avatar: File;

    public get formControl() {
        return this.formGroup.controls;
    }

    public ngOnInit(): void {
        this.listenUploadAvatar();
        const jwtResponse = this.accountService.getCurrentUser() as JwtResponse;
        this.formGroup.patchValue(jwtResponse.user);
    }

    public listenUploadAvatar(): void {
        this.dataService.fileTransfer$
            .pipe(takeUntil(this.destroy$))
            .subscribe(avatar => this.avatar = avatar);
    }

    public async saveProfile(): Promise<void> {
        Utils.beforeSubmitFormGroup(this.formGroup);
        if (this.formGroup.invalid) {
            this.toastsService.error('Thông tin không hợp lệ!');
            return;
        }

        this.spinnerService.showLoading();
        if (this.avatar) {
            const response = await lastValueFrom(this.resourceService.uploadImage(this.avatar));
            this.formControl.avatar.setValue(response.url);
        }
        
        const value = this.formGroup.value;
        this.accountService.updateProfile(value)
            .pipe(takeUntil(this.destroy$))
            .subscribe(res => {
                this.spinnerService.hideLoading();
                this.toastsService.success('Cập nhật hồ sơ thành công.');
                const confirm = this.modal.openConfirmPopup({
                    title: 'Thông báo',
                    content: 'Bạn cần đăng xuất để thông tin được cập nhật.',
                    withReason: false
                });
                confirm.dismissed.subscribe(res => {
                    if (res) {
                        this.authService.logout().subscribe();
                    }
                })
            })
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}