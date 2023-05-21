import { Component } from "@angular/core";
import { SignupFormComponent } from "src/app/module/account/components/signup-form/signup-form.component";

@Component({
    selector: 'signup-page',
    template: `<app-signup-form></app-signup-form>`,
    standalone: true,
    imports: [
        SignupFormComponent
    ]
})
export class SignupPage {

}