import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { AccountService } from "../../services/account.service";
import { SpinnerService } from "src/app/module/shared/spinner/services/spinner.service";
import { ToastrService } from "ngx-toastr";
import { Utils } from "src/app/core/utils/Utils";
import { Router, RouterLink } from "@angular/router";
import { InputDateComponent } from "src/app/module/shared";
import { FormWrapperComponent } from "src/app/module/auth";

@Component({
    selector: 'app-signup-form',
    templateUrl: './signup-form.component.html',
    styleUrls: ['../../../../login.template.scss','./signup-form.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        InputDateComponent,
        RouterLink,
        FormWrapperComponent,
    ]
})
export class SignupFormComponent {

    private readonly fb = inject(FormBuilder);
    private readonly accountService = inject(AccountService);
    private readonly spinnerService = inject(SpinnerService);
    private readonly toastrService = inject(ToastrService);
    private readonly router = inject(Router);
    
    public formGroup: FormGroup = this.fb.group({
        username: [null],
        password: [null],
        fullName: [null],
        phone: [null],
        email: [null],
    });


    public submit(): void {
        Utils.beforeSubmitFormGroup(this.formGroup);
        if (this.formGroup.invalid) return;
        this.spinnerService.showLoading();
        this.accountService.register(this.formGroup.value)
            .subscribe(res => {
                this.toastrService.success('Đăng ký thành công!');
                this.router.navigate(['auth', 'login']);
                this.spinnerService.hideLoading();
            })
    }
}