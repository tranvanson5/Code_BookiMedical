import { Component, Input, Output, OnChanges, OnInit, SimpleChanges, EventEmitter } from "@angular/core";
import { ColDef, GridReadyEvent, GridSizeChangedEvent } from "ag-grid-community";
import { BASE_STYLE, BASE_STYLE_CENTER, DEFAULT_PAGE_SIZE } from "src/app/base/_helpers/constant";
import { PaginationModel } from "src/app/base/core/models/pagination.model";
import { ResponseServiceModel } from "src/app/base/core/models/search.model";
import { HisChangeStatus } from "src/app/page/user/models/user.model";

@Component({
    selector: 'app-user-grid',
    templateUrl: './user-grid.component.html',
    styleUrls: ['./user-grid.component.scss']
})
export class UserGridComponent implements OnInit, OnChanges {

    @Input()
    result: ResponseServiceModel<HisChangeStatus>;

    @Output()
    paginate = new EventEmitter<number>();

    public columnDef: ColDef[];
    public pagination: PaginationModel = new PaginationModel();
    public rowData: any[] = [];

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes?.result?.currentValue) {
            this.rowData = this.result.data;
            this.pagination.currentPage = this.result.page;
            this.pagination.pageSize = this.result.pageSize;
            this.pagination.totalPage = this.result.totalPage,
            this.pagination.dataLength = this.result.data.length;
            this.pagination.totalRecord = this.result.total;
        }
    }

    public ngOnInit(): void {
        this.initColumn();
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
                headerName: 'Tên đăng nhập',
                headerTooltip: 'Tên đăng nhập',

                cellStyle: BASE_STYLE,

                field: 'username',
                tooltipField: 'username',
            },
            
            {
                headerName: 'Trạng thái cũ',
                headerTooltip: 'Trạng thái cũ',
                cellStyle: BASE_STYLE_CENTER,

                cellRenderer: param => {
                    return UserStatusCell(param.data.oldStatus);
                }
            },

            {
                headerName: 'Trạng thái mới',
                headerTooltip: 'Trạng thái mới',
                cellStyle: BASE_STYLE_CENTER,

                cellRenderer: param => {
                    return UserStatusCell(param.data.newStatus);
                }
            },

            {
                headerName: 'Ngày thay đổi',
                headerTooltip: 'Ngày thay đổi',
                cellStyle: BASE_STYLE,

                field: 'updateDate',
                tooltipField: 'updateDate',
            },

            {
                headerName: 'Người thay đổi',
                headerTooltip: 'Người thay đổi',
                cellStyle: BASE_STYLE,

                field: 'updater',
                tooltipField: 'updater'

            },
           
        ]
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

function UserStatusCell(status) {
    return `
        <div class='rounded px-2 ${status ? 'bg-success' : 'bg-warning'}' style='width: fit-content; min-width: 115px;'>
            ${status ? 'Hoạt động' : 'Không hoạt động'}
        </div>
    `
}