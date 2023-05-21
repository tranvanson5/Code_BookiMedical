import { CurrencyPipe } from '@angular/common';
import { Component } from "@angular/core";
import { ColDef, GridReadyEvent, GridSizeChangedEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { BASE_STYLE, BASE_STYLE_CENTER, DEFAULT_PAGE_SIZE } from 'src/app/base/_helpers/constant';
import { PaginationModel } from "src/app/base/core/models/pagination.model";
import { BillService } from 'src/app/page/bill/services/bill.service';
import { StatisticProduct } from 'src/app/page/product/models/product.model';
import { Chart } from '../../../common/model/chart.model';

@Component({
    selector: 'app-top-product',
    templateUrl: './top-product.component.html',
})
export class TopProductComponent {

    public top10Product$: Observable<Chart[]>;
    public columnDef: ColDef[];
    public pagination: PaginationModel = new PaginationModel();
    public rowData: StatisticProduct[] = [];
    public year: number = new Date().getFullYear();

    constructor(
        private currencyPipe: CurrencyPipe,
        private billService: BillService
    ) {}

    ngOnInit(): void {
        this.initColumn();
    }

    public getTop10Product(): void {
        this.top10Product$ = this.billService.getTopProduct({year: this.year, limit: 10});
    }

    public statisticProduct() {
        this.billService.statisticProduct({
            page: this.pagination.currentPage,
            pageSize: DEFAULT_PAGE_SIZE,
            data: this.year
        })
        .subscribe(res => {
            this.pagination.currentPage = res.page;
            this.pagination.pageSize = res.pageSize;
            this.pagination.totalPage = res.totalPage;
            this.pagination.totalRecord = res.total;
            this.pagination.dataLength = res.data.length;
            this.rowData = res.data;
        });
    }

    public initColumn(): void {
        this.columnDef = [
            {
                headerName: 'STT',
                headerTooltip: 'STT',

                minWidth: 60,
                maxWidth: 60,

                cellStyle: BASE_STYLE_CENTER,
                valueGetter: params => {
                    return params.node.rowIndex + 1 + (DEFAULT_PAGE_SIZE * (this.pagination.currentPage - 1));
                }
            },

            {
                headerName: 'Mã sản phẩm',
                headerTooltip: 'Mã sản phẩm',

                cellStyle: BASE_STYLE,

                field: 'code',
                tooltipField: 'code',
            },

            {
                headerName: 'Tên sản phẩm',
                headerTooltip: 'Tên sản phẩm',

                cellStyle: BASE_STYLE,

                field: 'name',
                tooltipField: 'name',
            },

            {
                headerName: 'Số lượng',
                headerTooltip: 'Số lượng',

                cellStyle: BASE_STYLE,

                field: 'quantity',
                tooltipField: 'quantity',
            },

            {
                headerName: 'Doanh thu',
                headerTooltip: 'Doanh thu',

                cellStyle: BASE_STYLE,

                valueGetter: param => {
                    return this.currencyPipe.transform(param.data.revenue, 'VND')
                },
            },
        ]
    }

    public onChangeYear(year): void {
        this.year = year;
        this.getTop10Product();
        this.statisticProduct();
        
    }

    public gridSizeChanged(event: GridSizeChangedEvent): void {
        event.api.sizeColumnsToFit();
    }

    public onGridReady(event: GridReadyEvent): void {
        setTimeout( () => {
            event.api.sizeColumnsToFit();
        })
    }
}