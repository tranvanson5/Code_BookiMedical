import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Subject, takeUntil, tap } from "rxjs";
import { ModalService, ResourcePipe, SafePipe } from "src/app/core";
import { CurrencyPipe } from "src/app/core/pipe/currency.pipe";
import { PagingComponent } from "src/app/module/shared";
import { PagingResponse } from "src/app/module/shared/paging/models/paging.model";
import { SpinnerService } from "src/app/module/shared/spinner/services/spinner.service";
import { Cart } from "../../models/cart.model";
import { CartService } from "../../services/cart.service";

@Component({
    selector: 'app-cart-table',
    templateUrl: './cart-table.component.html',
    styleUrls: ['./cart-table.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        AsyncPipe,
        NgFor,
        PagingComponent,
        SafePipe,
        ResourcePipe,
        CurrencyPipe,
    ]
})
export class CartTableComponent implements OnInit, OnDestroy {

    private readonly destroy$ = new Subject<void>();
    private readonly cartService = inject(CartService);
    private readonly spinnerService = inject(SpinnerService);
    private readonly toastrService = inject(ToastrService);
    private readonly modalService = inject(ModalService);

    public cartResponse: PagingResponse<Cart>;

    public ngOnInit(): void {
        this.paginate(1);
    }

    public paginate(page: number): void {
        this.spinnerService.showLoading();
        this.cartService.getMyCart({
            page: page,
            pageSize: 12,
            data: {}
        }).pipe(
            takeUntil(this.destroy$),
            tap(res => this.spinnerService.hideLoading())
        ).subscribe(res => {
            this.cartResponse = res;
        })
    }

    public onSelectCart(event: any, c: Cart): void {
        this.cartService.cartSelector.next({
            check: event.target.checked,
            cart: c
        });
    }

    public changeQuantity(event: any, cart: Cart): void {
        if (cart.quantity === event.target.valueAsNumber) return;
        cart.quantity = event.target.valueAsNumber;
        this.spinnerService.showLoading();
        this.cartService.updateQuantity({cartId: cart.id, quantity: cart.quantity})
            .pipe(
                takeUntil(this.destroy$),
                tap(res => this.spinnerService.hideLoading())
            ).subscribe();
    }

    public deleteCart(c: Cart): void {
        this.modalService.openConfirmPopup({
            title: 'Xác nhận',
            content: 'Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?',
            withReason: false,
        }).dismissed.subscribe(res => {
            if (res) {
                this.spinnerService.showLoading();
                this.cartService.deleteCart(c.id)
                    .subscribe(res => {
                        this.spinnerService.hideLoading();
                        this.toastrService.success('Xóa sản phẩm khỏi giỏ hàng thành công');
                        const index = this.cartResponse.data.findIndex(x => x.id === c.id);
                        this.cartResponse.data.splice(index, 1);
                        this.cartService.cartSelector.next({
                            check: false,
                            cart: c,
                        });
                    })
            }
        })
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}