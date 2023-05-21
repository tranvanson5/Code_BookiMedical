import { Component, OnDestroy, OnInit, ViewChild, inject } from "@angular/core";
import { CartTableComponent } from "../../components/cart-table/cart-table.component";
import { CartService } from "../../services/cart.service";
import { Observable, Subject, takeUntil } from "rxjs";
import { PagingResponse } from "src/app/module/shared/paging/models/paging.model";
import { Cart } from "../../models/cart.model";
import { PagingComponent } from "src/app/module/shared";
import { CurrencyPipe } from "src/app/core/pipe/currency.pipe";
import { BillService } from "src/app/module/bill/services/bill.service";
import { ToastrService } from "ngx-toastr";
import { SpinnerService } from "src/app/module/shared/spinner/services/spinner.service";

@Component({
    selector: 'app-cart-wrapper',
    templateUrl: './cart-wrapper.container.html',
    styleUrls: ['./cart-wrapper.container.scss'],
    standalone: true,
    imports: [
        CartTableComponent,
        PagingComponent,
        CurrencyPipe,
    ]
})
export class CartWrapperContainer implements OnInit, OnDestroy {

    @ViewChild('table') cartTable: CartTableComponent;

    private readonly destroy$ = new Subject<void>();
    private readonly cartService = inject(CartService);
    private readonly billService = inject(BillService);
    private readonly toastrService = inject(ToastrService);
    private readonly spinnerService = inject(SpinnerService);

    public selectedCart: Cart[] = [];

    public get total(): number {
        return this.selectedCart.reduce((total, cur) => {
            return total + (cur.product.price * cur.quantity);
        }, 0);
    }

    public ngOnInit(): void {
        this.cartService.cartSelector$
            .pipe(takeUntil(this.destroy$))
            .subscribe(x => {
                if (x.check) {
                    this.selectedCart.push(x.cart);
                } else {
                    const index = this.selectedCart.findIndex(z => z.id === x.cart.id);
                    this.selectedCart.splice(index, 1);
                }
            });
    }

    public checkout(): void {
        if (this.selectedCart.length === 0) {
            this.toastrService.error('Vui lòng chọn sản phẩm.');
            return;
        }
        this.spinnerService.showLoading();
        this.billService
            .checkout(this.selectedCart.map(c => c.id))
            .pipe(takeUntil(this.destroy$))
            .subscribe(res => {
                this.spinnerService.hideLoading();
                this.cartTable.paginate(1);
                window.open(res.linkPayment, '_blank');
            })
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}