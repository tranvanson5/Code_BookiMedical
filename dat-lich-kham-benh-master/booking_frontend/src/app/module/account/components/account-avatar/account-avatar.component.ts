import { Component, ElementRef, OnInit, ViewChild, inject } from "@angular/core";
import { ResourcePipe, SafePipe } from "src/app/core";
import { AccountService } from "../../services/account.service";
import { PreviewImageDirective } from "src/app/core/directives/preview-image.directive";
import { DataService } from "src/app/core/services/data.service";
import { ModalService } from "src/app/core/services/modal.service";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-account-avatar',
    templateUrl: './account-avatar.component.html',
    styleUrls: ['./account-avatar.component.scss'],
    standalone: true,
    imports: [
        SafePipe,
        ResourcePipe,
        PreviewImageDirective,
        NgbModalModule,
    ]
})
export class AccountAvatarComponent implements OnInit {
    
    @ViewChild('avatarElement')
    public avatarElement: ElementRef;

    private readonly accountService = inject(AccountService);
    private readonly dataService = inject(DataService);
    private readonly modal = inject(ModalService);

    public fullName: string;
    public email: string;
    public avatar: string;

    public ngOnInit(): void {
        const jwtResponse = this.accountService.getCurrentUser();
        this.fullName = jwtResponse?.user?.fullName ?? '';
        this.email = jwtResponse?.user?.email ?? '';
        this.avatar = jwtResponse?.user?.avatar ?? '/images/user/default-user.jpg';
    }

    public uploaded(file: File): void {
        this.dataService.fileTransfer.next(file);
    }

    public openChangePassword(): void {
        this.modal.openChangePassword();
    }

}