import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from "@angular/core";
import { ColDef, GridReadyEvent, GridSizeChangedEvent } from "ag-grid-community";
import { BASE_STYLE, DEFAULT_PAGE_SIZE } from "src/app/base/_helpers/constant";
import { PaginationModel } from "src/app/base/core/models/pagination.model";
import { BillActionComponent } from './components/action/bill-action.component';
import { BillModel } from "./models/bill.model";
import { BillService } from './services/bill.service';

const STATUS_BILL = {
    'APPROVED': {
        'color': '#198754',
        'background': '#3beb1b57',
        'text': 'Đã thanh toán'
    },
    'CREATED': {
        'color': '#ffc107',
        'background': '#ffe38f70',
        'text': 'Chưa thanh toán'
    }
}

@Component({
    selector: 'app-bill-container',
    templateUrl: './bill.container.html',
    styleUrls: ['./bill.container.scss']
})
export class BillContainer implements OnInit {

    public pagination: PaginationModel;
    public rowData: BillModel[] = [];
    public columnDef: ColDef[] | any[];
    public currentFormSearch: BillModel;

    constructor(
        private billService: BillService,
        private currencyPipe: CurrencyPipe,
        private datePipe: DatePipe
    ) {}

    public ngOnInit(): void {
        this.pagination = new PaginationModel();
        this.initColumn();
    }

    public doSearch(bill: BillModel, page: number): void {
        if (bill) this.currentFormSearch = bill;
        this.pagination.currentPage = page;
        this.billService.search({
            data: this.currentFormSearch,
            page: this.pagination.currentPage,
            pageSize: DEFAULT_PAGE_SIZE
        }).subscribe(res => {
            this.rowData = res.data;
            this.pagination.totalPage = res.totalPage;
            this.pagination.totalRecord = res.total;
            this.pagination.dataLength = this.rowData.length;
        })
    }

    public initColumn(): void {
        this.columnDef = [
            {
                headerName: 'STT',
                headerTooltip: 'STT',

                minWidth: 60,
                maxWidth: 60,
                cellStyle: BASE_STYLE,
                valueGetter: params => {
                    return params.node.rowIndex + 1 + (DEFAULT_PAGE_SIZE * (this.pagination.currentPage - 1));
                }
            },

            {
                headerName: 'Mã đơn hàng',
                headerTooltip: 'Mã đơn hàng',

                field: 'id',
                tooltipField: 'id',
                cellStyle: BASE_STYLE
            },

            {
                headerName: 'Mã PAYPAL',
                headerTooltip: 'Mã PAYPAL',

                field: 'billPaypalId',
                tooltipField: 'billPaypalId',
                cellStyle: BASE_STYLE
            },

            {
                headerName: 'Người mua',
                headerTooltip: 'Người mua',

                field: 'username',
                tooltipField: 'username',
                cellStyle: BASE_STYLE
            },

            {
                headerName: 'Ngày mua',
                headerTooltip: 'Ngày mua',

                valueGetter: param => this.datePipe.transform(param.data.createdDate, 'dd/MM/yyyy'),
                tooltipValueGetter: param => this.datePipe.transform(param.data.createdDate, 'dd/MM/yyyy'),
                cellStyle: BASE_STYLE,
            },
            
            {
                headerName: 'Tổng tiền',
                headerTooltip: 'Tổng tiền',

                valueGetter: param => {
                    return this.currencyPipe.transform(param.data.total, 'VND');
                },
                tooltipValueGetter: param => {
                    return this.currencyPipe.transform(param.data.total, 'VND');
                },

                cellStyle: BASE_STYLE,
            },

            {
                headerName: 'Trạng thái',
                headerTooltip: 'Trạng thái',

                cellStyle: BASE_STYLE,
                cellRenderer: param => {
                    const s = STATUS_BILL[param.data.status];
                    return `<div style='background: ${s.background}; color: ${s.color}; width: 120px; padding: 0 10px; border-radius: 20px;' class='text-center fw-bolder'>
                        ${s.text}
                    </div>`
                }
            },

            {
                cellRenderer: BillActionComponent,
                cellStyle: {
                    'overflow': 'unset'
                },
                minWidth: 50,
                maxWidth: 50,
            }
        ]
    }

    public gridSizeChanged(event: GridSizeChangedEvent): void {
        event.api.sizeColumnsToFit();
    }

    public onGridReady(event: GridReadyEvent): void {
        
    }
}