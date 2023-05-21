import { CurrencyPipe, formatDate } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { ColDef, GridReadyEvent, GridSizeChangedEvent } from "ag-grid-community";
import { Subject, takeUntil } from "rxjs";
import { BASE_STYLE, DEFAULT_PAGE_SIZE } from "src/app/base/_helpers/constant";
import { StatusComponent } from "src/app/base/core/components/cells/status/status.component";
import { PaginationModel } from "src/app/base/core/models/pagination.model";
import { ActionComponent } from "./components/action/action.component";
import { CreateUpdateProductComponent } from "./components/create-update-product/create-update-product.component";
import { ProductCodeCellComponent } from "./components/product-code/product-code-cell.component";
import { FormSearchProductModel } from "./models/form-search-product.model";
import { ProductModel } from "./models/product.model";
import { ProductService } from "./services/product.service";

@Component({
    selector: 'app-product-container',
    templateUrl: './product.container.html',
    styleUrls: ['./product.container.scss']
})
export class ProductContainer implements OnInit, OnDestroy {

    unsubscribe$: Subject<void> = new Subject();

    currentDataSearch: FormSearchProductModel;

    columnDefs: (ColDef | any)[] = [];
    rowData: ProductModel[];
    pagination: PaginationModel;

    constructor(
        private matDialog: MatDialog,
        private productService: ProductService,
        private currencyPipe: CurrencyPipe,
    ) {}

    ngOnInit(): void {
        this.pagination = new PaginationModel();
        this.initColumn();
    }

    initColumn(): void {
        this.columnDefs = [
            {
                headerName: 'STT',
                headerTooltip: 'STT',

                minWidth: 60,
                maxWidth: 60,

                valueGetter: params => {
                    return params.node.rowIndex + 1 + ( DEFAULT_PAGE_SIZE * (this.pagination.currentPage - 1));
                },

                cellStyle: BASE_STYLE,
            },

            {
                headerName: 'Mã sản phẩm',
                headerTooltip: 'Mã sản phẩm',

                minWidth: 150,

                cellRenderer: ProductCodeCellComponent,

                cellStyle: BASE_STYLE,
            },

            {
                headerName: 'Tên sản phẩm',
                headerTooltip: 'Tên sản phẩm',

                minWidth: 150,

                field: 'name',
                tooltipField: 'name',

                cellStyle: BASE_STYLE,
            },

            {
                headerName: 'Giá',
                headerTooltip: 'Giá',

                minWidth: 100,

                valueGetter: params => this.currencyPipe.transform(params.data.price, 'VND'),
                tooltipValueGetter: params => this.currencyPipe.transform(params.data.price, 'VND'),

                cellStyle: BASE_STYLE,
            },

            {
                headerName: 'Ngày tạo',
                headerTooltip: 'Ngày tạo',

                minWidth: 100,

                tooltipValueGetter: params => {
                    return formatDate(params.data.createdDate, 'dd/MM/yyyy', 'en_US');
                },
                valueGetter: params => {
                    return formatDate(params.data.createdDate, 'dd/MM/yyyy', 'en_US');
                },

                cellStyle: BASE_STYLE
            },

            {
                headerName: 'Ngày cập nhật',
                headerTooltip: 'Ngày cập nhật',

                minWidth: 100,

                tooltipValueGetter: params => {
                    if (!params.data.updatedDate) return null;
                    return formatDate(params.data.updatedDate, 'dd/MM/yyyy', 'en_US');
                },
                valueGetter: params => {
                    if (!params.data.updatedDate) return null;
                    return formatDate(params.data.updatedDate, 'dd/MM/yyyy', 'en_US');
                },

                cellStyle: BASE_STYLE
            },

            {
                headerName: 'Trạng thái',
                headerTooltip: 'Trạng thái',

                minWidth: 100,

                cellRenderer: StatusComponent,
                values: ['Không hoạt động', 'Hoạt động'],
                backgrounds: ['#FFEDE4', '#F4FEFF'],
                colors: ['#DF642A', '#00A3AE'],

                cellStyle: BASE_STYLE
            },

            {
                cellRenderer: ActionComponent,
                cellRendererParams: {
                    onEdit: this.doEdit.bind(this),
                },

                minWidth: 48,
                maxWidth: 48,

                cellStyle: {
                    'overflow': 'unset',
                    'padding-top': '10px',
                }
            }
        ]
    }

    doSearch(page?: number, data?: FormSearchProductModel): void {
        if (data) this.currentDataSearch = data;
        if (page) this.pagination.currentPage = page;
        this.productService
            .doSearch({
                page: this.pagination.currentPage,
                pageSize: DEFAULT_PAGE_SIZE,
                data: this.currentDataSearch
            })
            .pipe(
                takeUntil(this.unsubscribe$)
            )
            .subscribe(res => {
                this.rowData = res.data;
                this.pagination.dataLength = this.rowData.length;
                this.pagination.totalPage = res.totalPage;
                this.pagination.totalRecord = res.total;
            })
    }

    doEdit(data: ProductModel): void {
        this.openCreateUpdate(data);
    }


    openCreateUpdate(data: ProductModel): void {
        this.matDialog.open(CreateUpdateProductComponent, {
            width: '1000px',
            data: data,
        }).afterClosed().subscribe(event => {
            if (event.action === 'save') this.doSearch(this.pagination.currentPage, this.currentDataSearch);
        })
    }

    onGridReady(event: GridReadyEvent): void {
        event.api.sizeColumnsToFit();
    }

    gridSizeChanged(event: GridSizeChangedEvent): void {
        event.api.sizeColumnsToFit();
    }

    ngOnDestroy(): void {
        this.unsubscribe$ && this.unsubscribe$.unsubscribe();
    }
}