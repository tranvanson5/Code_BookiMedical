import { Component, OnDestroy, OnInit } from "@angular/core";
import { ColDef, GridReadyEvent, GridSizeChangedEvent } from "ag-grid-community";
import { Subject, takeUntil } from "rxjs";
import { BASE_STYLE, DEFAULT_PAGE_SIZE } from "src/app/base/_helpers/constant";
import { PaginationModel } from "src/app/base/core/models/pagination.model";
import { SpinnerService } from "src/app/base/core/services/spinner.service";
import { AppointmentActionComponent } from "./components/appointment-action/appointment-action.component";
import { AppointmentStatusMap as AppointmentStatusMap } from "./constant/appointment.enum";
import { AppointmentRequest, AppointmentResponse } from "./models/appointment.model";
import { AppointmentService } from "./services/appointment.service";

@Component({
    selector: 'app-appointment-container',
    templateUrl: './appointment.container.html',
    styleUrls: ['./appointment.container.scss']
})
export class AppointmentContainer implements OnInit, OnDestroy {

    private unsubscribe$: Subject<void> = new Subject();

    public pagination: PaginationModel;
    public rowData: AppointmentResponse[] = [];
    public columnDef: ColDef[] | any[];
    public currentFormSearch: AppointmentRequest;

    constructor(
        private appointmentService: AppointmentService,
        private spinnerService: SpinnerService
    ) {}

    public ngOnInit(): void {
        this.pagination = new PaginationModel();
        this.initColumn();
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
                    return params.node.rowIndex + 1 + ( DEFAULT_PAGE_SIZE * (this.pagination.currentPage - 1));
                }
            },

            {
                headerName: 'Họ và tên',
                headerTooltip: 'Họ và tên',

                field: 'fullName',
                tooltipField: 'fullName',

                cellStyle: BASE_STYLE,
            },

            {
                headerName: 'Tuổi',
                headerTooltip: 'Tuổi',
                field: 'age',
                tooltipField: 'age',

                cellStyle: BASE_STYLE,
            },

            {
                headerName: 'Trạng thái',
                headerTooltip: 'Trạng thái',

                valueGetter: param => {
                    return AppointmentStatusMap[param.data.status].name
                },

                tooltipValueGetter: param => {
                    return AppointmentStatusMap[param.data.status].name
                },

                cellStyle: param => {
                    const { color } = AppointmentStatusMap[param.data.status];
                    return {
                        ...BASE_STYLE,
                        color: color,
                    }
                },
            },

            {
                headerName: 'Ngày hẹn',
                headerTooltip: 'Ngày hẹn',
                field: 'time',
                tooltipField: 'time',

                cellStyle: BASE_STYLE,
            },

            {
                headerName: 'Chi nhánh',
                headerTooltip: 'Chi nhánh',
                field: 'departmentName',
                tooltipField: 'departmentName',

                cellStyle: BASE_STYLE,
            },

            {
                cellRenderer: AppointmentActionComponent,
                minWidth: 48,
                maxWidth: 48,
                cellStyle: {
                    'overflow': 'unset',
                    'padding-top': '10px',
                },
            }
        ]
    }

    public doSearch(category?: AppointmentRequest, page?: number): void {
        if (category) this.currentFormSearch = category;
        if (page) this.pagination.currentPage = page;
        this.spinnerService.isLoading(true);
        this.appointmentService.searchAppointmentAndPagination({
            page: this.pagination.currentPage,
            pageSize: DEFAULT_PAGE_SIZE,
            data: this.currentFormSearch
        }).pipe(
            takeUntil(this.unsubscribe$)
        )
        .subscribe(res => {
            this.spinnerService.isLoading(false);
            this.rowData = res.data;
            this.pagination.dataLength = this.rowData.length;
            this.pagination.totalPage = res.totalPage;
            this.pagination.totalRecord = res.total;
        })
    
    }

    public gridSizeChanged(event: GridSizeChangedEvent): void {
        event.api.sizeColumnsToFit();
    }

    public ngOnDestroy(): void {
        this.unsubscribe$ && this.unsubscribe$.unsubscribe();
    }
}