import { Component, inject } from "@angular/core";
import { BillDetail } from "../../models/bill.model";
import { NgFor } from "@angular/common";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CurrencyPipe } from "src/app/core/pipe/currency.pipe";
import { ResourcePipe, SafePipe } from "src/app/core";

@Component({
    selector: 'app-bill-detail',
    templateUrl: './bill-detail.component.html',
    standalone: true,
    imports: [
        NgFor,
        SafePipe,
        CurrencyPipe,
        ResourcePipe,
    ]
})
export class BillDetailComponent {
    public details: BillDetail[]; 

    private readonly modalRef = inject(NgbActiveModal);

    public close() {
        this.modalRef.dismiss();
    }
}