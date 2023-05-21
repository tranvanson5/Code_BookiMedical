import { DatePipe, NgFor, NgIf } from "@angular/common";
import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { ModalService, ResourcePipe, SafePipe } from "src/app/core";
import { CurrencyPipe } from "src/app/core/pipe/currency.pipe";
import { PagingComponent } from "src/app/module/shared";
import { PagingResponse } from "src/app/module/shared/paging/models/paging.model";
import { SpinnerService } from "src/app/module/shared/spinner/services/spinner.service";
import { Bill } from "../../models/bill.model";
import { BillService } from "../../services/bill.service";
import { BillDetailComponent } from '../bill-detail/bill-detail.component';

@Component({
    selector: 'app-bill-table',
    templateUrl: './bill-table.component.html',
    styleUrls: ['./bill-table.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        CurrencyPipe,
        DatePipe,
        SafePipe,
        SafePipe,
        ResourcePipe,
        PagingComponent,
    ]
})
export class BillTableComponent implements OnInit, OnDestroy {

    private readonly destroy$ = new Subject<void>();
    private readonly billService = inject(BillService);
    private readonly spinnerService = inject(SpinnerService);
    private readonly modalService = inject(ModalService);

    public billResponse: PagingResponse<Bill>;

    public ngOnInit(): void {
        this.paginate(1);
    }

    public paginate(page: number): void {
        this.spinnerService.showLoading();
        this.billService.getMyBill({
            page: page,
            pageSize: 6,
            data: {}
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => {
            this.spinnerService.hideLoading();
            this.billResponse = res;
        })
    }

    public showDetail(b: Bill) {
        this.spinnerService.showLoading();
        this.billService.getBillDetail(b.id)
            .subscribe(res => {
                this.spinnerService.hideLoading();
                const ref = this.modalService.openPopup(BillDetailComponent, 'xl');
                ref.componentInstance.details = res;
            });
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}