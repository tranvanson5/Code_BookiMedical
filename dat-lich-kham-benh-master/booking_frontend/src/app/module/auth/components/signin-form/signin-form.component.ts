import { ToastrService } from 'ngx-toastr';
import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { JwtRequest } from "src/app/core/models/jwt.model";
import { AuthService } from "src/app/core/services/auth.service";
import { SpinnerService } from "src/app/module/shared/spinner/services/spinner.service";
import { encode } from 'js-base64';
import { FormWrapperComponent } from '../form-wrapper/form-wrapper.component';

@Component({
    selector: 'app-signin-form',
    templateUrl: './signin-form.component.html',
    styleUrls: ['../../../../login.template.scss', './signin-form.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterLink,
        FormWrapperComponent,
    ]
})
export class SigninFormComponent {

    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);
    private spinnerService = inject(SpinnerService);
    private toastrService = inject(ToastrService);

    public formGroup = this.fb.group({
        username: [null, [Validators.required]],
        password: [null, [Validators.required]]
    });

    public ngSubmitForm(): void {
        if (this.formGroup.invalid) return;
        this.spinnerService.showLoading();
        const jwtRequest = this.formGroup.value;
        this.authService.login(jwtRequest as unknown as JwtRequest)
            .subscribe(res => {
                this.toastrService.success('Đăng nhập thành công');
                this.spinnerService.hideLoading();
                
                const resEncoded = encode(JSON.stringify(res));
                window.localStorage.setItem('secret', resEncoded);
                this.router.navigate(['home']);
            })
    }
}