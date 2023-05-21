import { Component } from "@angular/core";
import { AccountAvatarComponent } from "src/app/module/account/components/account-avatar/account-avatar.component";
import { AccountFormComponent } from "src/app/module/account/components/account-form/account-form.component";

@Component({
    selector: 'profile-page',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
    standalone: true,
    imports: [
        AccountFormComponent,
        AccountAvatarComponent
    ]
})
export class ProfilePage {
    
}