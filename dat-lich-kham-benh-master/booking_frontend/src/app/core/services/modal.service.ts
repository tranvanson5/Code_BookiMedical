import { Injectable, TemplateRef, inject } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { QRCodeComponent } from "src/app/module";
import { ChangePasswordComponent } from "src/app/module/account/components/change-password/change-password.component";
import { ConfirmPopupComponent } from "src/app/module/shared/confirm-popup/confirm-popup.component";
import { Confirmation } from "src/app/module/shared/confirm-popup/models/confirm.model";

@Injectable({
    providedIn: 'root',
})
export class ModalService {

    private readonly modal = inject(NgbModal);

    public openQrCode(data: string, title: string): NgbModalRef {
        const ref = this.openPopup(QRCodeComponent);
        ref.componentInstance.data = data;
        ref.componentInstance.title = title;
        return ref;
    }

    public openConfirmPopup(data: Confirmation): NgbModalRef {
        const md = this.openPopup(ConfirmPopupComponent);
        const confirm = md.componentInstance as ConfirmPopupComponent;
        confirm.confirmationData = data;
        return md;
    }

    public openChangePassword(): NgbModalRef {
        const md = this.openPopup(ChangePasswordComponent)

        return md;
    }

    public openPopup(component: any, width?: 'sm' | 'lg' | 'xl'): NgbModalRef {
        return this.modal.open(component, {
            animation: true,
            centered: true,
            size: width
        });
    }
}