import { Component } from "@angular/core";
import { SigninFormComponent } from "src/app/module/auth";

@Component({
    selector: 'sign-in-page',
    templateUrl: './sign-in.page.html',
    styleUrls: ['./sign-in.page.scss'],
    standalone: true,
    imports: [
        SigninFormComponent
    ]
})
export class SignInPage {
    
}