import { Component } from "@angular/core";
import { ForgotPasswordComponent } from "src/app/module/auth/components/forgot-password/forgot-password.component";

@Component({
    selector: 'forgot-password-page',
    template: '<app-forgot-password></app-forgot-password>',
    standalone: true,
    imports: [
        ForgotPasswordComponent
    ]
})
export class ForgotPasswordPage {

}