import { Item } from './../../models/service-package.model';
import { Component, Input, inject } from '@angular/core';
import { ServicePackage } from '../../models/service-package.model';
import { CommonModule } from '@angular/common';
import { ModalService, ResourcePipe, SafePipe } from 'src/app/core';
import { CurrencyPipe } from 'src/app/core/pipe/currency.pipe';
import { CartService } from 'src/app/module/cart/services/cart.service';
import { SpinnerService } from 'src/app/module/shared/spinner/services/spinner.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-service-info',
    templateUrl: './service-info.component.html',
    styleUrls: ['./service-info.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        SafePipe,
        ResourcePipe,
        CurrencyPipe,
    ]
})
export class ServiceInfoComponent {

    @Input()
    public data: ServicePackage;

    @Input()
    public shop: boolean;

    private readonly cartService = inject(CartService);
    private readonly spinnerService = inject(SpinnerService);
    private readonly toastService = inject(ToastrService);
    private readonly modal = inject(ModalService);

    public addToCart(): void {
        this.spinnerService.showLoading();
        this.cartService.addToCart({
            productId: this.data.id,
            quantity: 1
        }).subscribe(res => {
            this.spinnerService.hideLoading();
            this.toastService.success('Thêm vào giỏ hàng thành công');
        })
    }

    public openQrCode(): void {
        if (Object.keys(this.data).includes('uuid')) {
            const i = this.data as Item
            this.modal.openQrCode(i.uuid, this.data.name)
        }
    }
}