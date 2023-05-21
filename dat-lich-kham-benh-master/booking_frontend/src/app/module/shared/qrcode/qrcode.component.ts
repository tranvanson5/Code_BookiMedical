import { Component, Input, inject } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { QRCodeModule } from 'angularx-qrcode';

@Component({
    selector: 'app-qrcode',
    templateUrl: './qrcode.component.html',
    styleUrls: ['./qrcode.component.scss'],
    standalone: true,
    imports: [
        QRCodeModule
    ]
})
export class QRCodeComponent {

    @Input()
    data: string;

    @Input()
    title: string;

    private readonly modal = inject(NgbActiveModal);

    public close(): void {
        this.modal.dismiss();
    }
}