import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from "@angular/core";
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
import { BillTree } from 'src/app/page/bill/models/bill.model';

@Component({
    selector: 'app-revenue',
    templateUrl: './revenue.component.html'
})
export class RevenueComponent implements OnInit {

    @Input()
    result: BillTree[];

    public columnDef: ColDef[];
    public rowData: any[] = [];

    public autoGroupColumnDef: ColDef = {
        field: 'key',
        headerName: 'Năm',
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
        private currencyPipe: CurrencyPipe
    ) { }

    ngOnInit(): void {
        this.initColumn();
    }

    public initColumn(): void {
        this.columnDef = [
            {
                headerName: 'Doanh thu',
                headerTooltip: 'Doanh thu',

                cellStyle: param => {
                    const color = param.data.rateGrowth > 0 ? 'green' : param.data.rateGrowth == 0 ? 'blue' : 'red';
                    return {
                        ...BASE_STYLE,
                        'color': color,
                        'font-weight': 'bold'
                    }
                },

                cellRenderer: param => {
                    return cellWithIcon(param.data.rateGrowth, this.currencyPipe.transform(param.data.revenue, 'VND'));
                }
            },

            {
                headerName: 'Tăng trưởng',
                headerTooltip: 'Tăng trưởng',

                cellStyle: param => {
                    const color = param.data.rateGrowth > 0 ? 'green' : param.data.rateGrowth == 0 ? 'blue' : 'red';
                    return {
                        ...BASE_STYLE,
                        'color': color,
                        'font-weight': 'bold'
                    }
                },

                cellRenderer: param => {
                    return cellWithIcon(param.data.rateGrowth, this.currencyPipe.transform(param.data.growth, 'VND'));
                }
            },

            {
                headerName: 'Tỉ lệ tăng trưởng(%)',
                headerTooltip: 'Tỉ lệ tăng trưởng',

                cellStyle: param => {
                    const color = param.data.rateGrowth > 0 ? 'green' : param.data.rateGrowth == 0 ? 'blue' : 'red';
                    return {
                        ...BASE_STYLE,
                        'color': color,
                        'font-weight': 'bold'
                    }
                },

                cellRenderer: param => {
                    return cellWithIcon(param.data.rateGrowth, param.data.rateGrowth + '%');
                }
            },
        ]
    }

    public gridSizeChanged(event: GridSizeChangedEvent): void {
        event.api.sizeColumnsToFit();
    }

    public onGridReady(event: GridReadyEvent): void {
        setTimeout(() => {
            event.api.sizeColumnsToFit();
        });

        const fakeServer = createFakeServer(this.result);
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
                        growth: d.growth,
                        rateGrowth: d.rateGrowth,
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

function cellWithIcon(rate: number, value: any) {
    let icon = 'fas fa-arrows-alt-h';
    if (rate > 0) {
        icon = 'fas fa-arrow-up';
    } 

    if (rate < 0) {
        icon = 'fas fa-arrow-down';
    }
    return `
        <div>
            <span class='me-2'>${value}</span>
            <i class="${icon}"></i>
        </div>
    `
}