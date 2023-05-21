import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { BillService } from 'src/app/page/bill/services/bill.service';
import { Chart } from '../../../common/model/chart.model';
import {
    ColDef,
    GetServerSideGroupKey,
    GridReadyEvent,
    GridSizeChangedEvent,
    ICellRendererParams,
    IServerSideDatasource,
    IServerSideGetRowsParams,
    IServerSideGetRowsRequest,
    IsServerSideGroup,
    IsServerSideGroupOpenByDefaultParams
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { BASE_STYLE } from 'src/app/base/_helpers/constant';
import { ProductTree } from 'src/app/page/product/models/product.model';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-revenue-monthly',
    templateUrl: './revenue-monthly.component.html'
})
export class RevenueMonthlyComponent implements OnInit {
    public monthly$: Observable<Chart[]>;

    public columnDef: ColDef[];
    public rowData: ProductTree[];

    public autoGroupColumnDef: ColDef = {
        field: 'key',
        headerName: 'Tháng/Mã sản phẩm',
        cellRendererParams: {
            innerRenderer: (params: ICellRendererParams) => {
                return params.data.key;
            },
        },
    };

    public isServerSideGroupOpenByDefault: (
        params: IsServerSideGroupOpenByDefaultParams
    ) => boolean = (params: IsServerSideGroupOpenByDefaultParams) => {
        return false;
    };
    
    public isServerSideGroup: IsServerSideGroup = (dataItem: any) => {
        return dataItem.group;
    };

    public getServerSideGroupKey: GetServerSideGroupKey = (dataItem: any) => {
        return dataItem.key;
    };

    constructor(
        private billService: BillService,
        private currencyPipe: CurrencyPipe,
    ) {}

    public ngOnInit(): void {
        this.initColumn();
    }

    public initColumn(): void {
        this.columnDef = [

            {
                headerName: 'Tên sản phẩm',
                headerTooltip: 'Tên sản phẩm',

                cellStyle: BASE_STYLE,
                field: 'name',
                tooltipField: 'name'
            },

            {
                headerName: 'Số lượng',
                headerTooltip: 'Số lượng',

                cellStyle: BASE_STYLE,
                
                field: 'quantity',
            },

            {
                headerName: 'Doanh thu',
                headerTooltip: 'Doanh thu',

                cellStyle: BASE_STYLE,

                valueGetter: param => {
                    return this.currencyPipe.transform(param.data.revenue, 'VND')
                },
                tooltipValueGetter: param => {
                    return this.currencyPipe.transform(param.data.revenue, 'VND')
                }
            },
        ]
    }


    onChangeYear(year): void {
        this.monthly$ = this.billService.revenueMonthly(year);
        this.billService.revenueProductMonthly(year)
        .subscribe(res => this.rowData = res);
    }

    public gridSizeChanged(event: GridSizeChangedEvent): void {
        event.api.sizeColumnsToFit();
    }

    public onGridReady(event: GridReadyEvent): void {
        setTimeout(() => {
            event.api.sizeColumnsToFit();
        });
        console.log(this.rowData)
        const fakeServer = createFakeServer(this.rowData);
        const datasource = createServerSideDataSource(fakeServer);
        event.api.setServerSideDatasource(datasource);
    }
}

function createFakeServer(fakeServerData: any[]) {
    const fakeServer = {
        data: fakeServerData,
        getData: function (request: IServerSideGetRowsRequest) {
            function extractRowsFromData(groupKeys: string[], data: any[]): any {
                if (groupKeys.length === 0) {
                    return data.map(d => ({
                        group: !!d.children,
                        key: d.key,
                        name: d.name,
                        quantity: d.quantity,
                        revenue: d.revenue,
                    }));
                }
                const key = groupKeys[0];
                for (const d of data) {
                    if (d.key === key) {
                        return extractRowsFromData(
                            groupKeys.slice(1),
                            d.children.slice()
                        );
                    }
                }
            }
            return extractRowsFromData(request.groupKeys, this.data);
        },
    };
    return fakeServer;
}

function createServerSideDataSource(fakeServer: any) {
    const dataSource: IServerSideDatasource = {
        getRows: (params: IServerSideGetRowsParams) => {
            const allRows = fakeServer.getData(params.request);
            const request = params.request;
            const doingInfinite = request.startRow != null && request.endRow != null;
            const result = doingInfinite
                ? {
                    rowData: allRows.slice(request.startRow, request.endRow),
                    rowCount: allRows.length,
                }
                : { rowData: allRows };
            setTimeout(function () {
                params.success(result);
            }, 200);
        },
    };
    return dataSource;
}