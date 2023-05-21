import { GridColumnsChangedEvent, GridReadyEvent } from 'ag-grid-community';
import { CurrencyPipe } from '@angular/common';
import { BASE_STYLE } from 'src/app/base/_helpers/constant';
import { ColDef } from 'ag-grid-community';
import { BillDetailModel } from './../../models/bill-detail.model';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { BillService } from './../../services/bill.service';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Component, TemplateRef } from "@angular/core";
import { ICellRendererParams } from 'ag-grid-community';
import { ResourcePipe } from 'src/app/base/core/pipes/resource.pipe';

@Component({
    selector: 'app-bill-action',
    templateUrl: './bill-action.component.html',
    styleUrls: ['./bill-action.component.scss']
})
export class BillActionComponent implements ICellRendererAngularComp {
   
    public params: ICellRendererParams | any;
    public matDialogRef: MatDialogRef<void>;
    
    // grid
    public columnDef: (ColDef)[];
    public rowData: (BillDetailModel | any)[] = [];

    constructor(
        private billService: BillService,
        private matDialog: MatDialog,
        private currencyPipe: CurrencyPipe,
        private resourcePipe: ResourcePipe,
    ) {}

    refresh(params: ICellRendererParams): boolean {
        return true;
    }
   
    agInit(params: ICellRendererParams): void {
        this.params = params;
    }
    
    public showBillDetails(template: TemplateRef<void>): void {
        this.initColumn();
        this.matDialogRef = this.matDialog.open(template, {
            width: '800px',

        });
        this.matDialogRef.afterOpened().subscribe(res => {
            this.billService.getBillDetial(this.params.data.id).subscribe(res => {
                this.rowData = res;
            })
        })
    }

    private initColumn(): void {
        this.columnDef = [
            {
                headerName: 'Hình ảnh',
                headerTooltip: 'Hình ảnh',

                cellStyle: {
                    ...BASE_STYLE,
                    'overflow': 'unset',
                },
                minWidth: 100,
                maxWidth: 100,

                cellRenderer: params => (`
                    <img class="scale-image" width="100%" height="100%" src="${ this.resourcePipe.transform(params.data.product.avatar)}" />
                `)

            },
            {
                headerName: 'Tên sản phẩm',
                headerTooltip: 'Tên sản phẩm',

                minWidth: 200,
                cellStyle: BASE_STYLE,

                field: 'product.name',
                tooltipField: 'product.name'
            },
            
            {
                headerName: 'Giá',
                headerTooltip: 'Giá',

                minWidth: 150,
                cellStyle: BASE_STYLE,

                valueGetter: params => this.currencyPipe.transform(params.data.price, 'VND'),
                tooltipValueGetter: params => this.currencyPipe.transform(params.data.price, 'VND')
            },
            
            {
                headerName: 'Số lượng',
                headerTooltip: 'Số lượng',

                minWidth: 120,
                maxWidth: 120,
                cellStyle: BASE_STYLE,

                field: 'quantity',
                tooltipField: 'quantity',
            },

            {
                headerName: 'Tổng tiền',
                headerTooltip: 'Tổng tiền',

                minWidth: 150,
                cellStyle: BASE_STYLE,

                valueGetter: params => this.currencyPipe.transform((params.data.price * params.data.quantity), 'VND'),
                tooltipValueGetter: params => this.currencyPipe.transform((params.data.price * params.data.quantity), 'VND'),
            }
        ]
    }

    public gridReady(event: GridReadyEvent): void {
        event.api.sizeColumnsToFit();
    }

    public gridColumnsChanged(event: GridColumnsChangedEvent): void {
        event.api.sizeColumnsToFit();
    }

    get parent() {
        return this.params.context.parent;
    }
}