import { Component } from "@angular/core";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { ToastrService } from "ngx-toastr";
import { ACTION_ACCEPT } from "src/app/base/_helpers/constant";
import { ConfirmComponent } from "src/app/base/core/components/popup-confirm/popup-confirm.component";
import { SpinnerService } from "src/app/base/core/services/spinner.service";
import { ProductService } from "../../services/product.service";
import { CreateUpdateProductComponent } from "../create-update-product/create-update-product.component";

@Component({
    selector: 'app-action-grid',
    templateUrl: './action-grid.component.html',
    styleUrls: ['./action-grid.component.scss']
})
export class ActionComponent implements ICellRendererAngularComp {

    params;
    data;
    context;
    public matDialogRef: MatDialogRef<void>;

    constructor(
        private toastrService: ToastrService,
        private spinnerService: SpinnerService,
        private matDialog: MatDialog,
        private productService: ProductService,
    ) {}

    refresh(params: ICellRendererParams): boolean {
        return true;
    }

    agInit(params: ICellRendererParams): void {
        this.params = params;
        this.data = this.params.data;
        this.context = this.params.context;
    }

    onEdit(): void {
        this.matDialog.open(CreateUpdateProductComponent, {
            width: '1000px',
            data: this.data,
        }).afterClosed().subscribe(res => {
            if (res) this.context.doSearch();
        })
    }

    onActive(): void {
        this.matDialog.open(ConfirmComponent, {
            data: {
                title: 'Xác nhận',
                message: 'Bạn có đống ý mở sản phẩm này?'
            }
        }).afterClosed().subscribe(res => {
            if (res == ACTION_ACCEPT) {
                this.spinnerService.isLoading(true);
                this.productService.changeStatus(this.data.id)
                    .subscribe(res => {
                        this.spinnerService.isLoading(false);
                        this.toastrService.success('Mở sản phẩm thành công.')
                        this.context.doSearch();
                    })
            }
        })
    }

    onBlock(): void {
        this.matDialog.open(ConfirmComponent, {
            data: {
                title: 'Xác nhận',
                message: 'Bạn có chắc chắn khóa sản phẩm này?'
            }
        }).afterClosed().subscribe(res => {
            if (res == ACTION_ACCEPT) {
                this.spinnerService.isLoading(true);
                this.productService.changeStatus(this.data.id)
                    .subscribe(res => {
                        this.spinnerService.isLoading(false);
                        this.toastrService.success('Khóa sản phẩm thành công.')
                        this.context.doSearch();
                    })
            }
        })
    }
}