import { Component, inject } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Confirmation } from "./models/confirm.model";
import { SafePipe } from "src/app/core";
import { NgIf, NgTemplateOutlet } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'app-confirm-popup',
    templateUrl: './confirm-popup.component.html',
    styleUrls: ['./confirm-popup.component.scss'],
    standalone: true,
    imports: [
        SafePipe,
        NgIf,
        NgTemplateOutlet,
        FormsModule
    ]
})
export class ConfirmPopupComponent {
 
    public confirmationData: Confirmation;
    public reason: string;

    private readonly toast = inject(ToastrService);
    private readonly modal = inject(NgbActiveModal);

    public close(): void {
        this.modal.dismiss();
    }

    public accept(): void {
        if (this.confirmationData.withReason && !this.reason) {
            this.toast.error('Bạn phải nhật lý do.');
            return;
        }
        this.modal.dismiss(
            this.confirmationData.withReason 
            ? {reason: this.reason}
            : 'ok'
        )
    }
}