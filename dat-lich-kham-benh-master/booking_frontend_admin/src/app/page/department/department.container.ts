import { Component, OnInit } from "@angular/core";
import {
	GridReadyEvent,
	GridSizeChangedEvent
} from 'ag-grid-community';
import { BASE_STYLE, DEFAULT_PAGE_SIZE } from 'src/app/base/_helpers/constant';
import { ActionComponent } from './components/action/action.component';
import { DepartmentSearchReq } from "./models/department-search.model";
import { PaginationModel } from "src/app/base/core/models/pagination.model";
import { DepartmentService } from "./services/department.service";
import { Department } from "./models/department.model";
import { StatusComponent } from "src/app/base/core/components/cells/status/status.component";
import { SpinnerService } from "src/app/base/core/services/spinner.service";
import { MatDialog } from "@angular/material/dialog";
import { CreateUpdateDepartmentComponent } from "./components/create-update-department/create-update-department.component";

@Component({
	selector: 'app-department-container',
	templateUrl: './department.container.html',
	styleUrls: ['./department.container.scss']
})
export class DepartmentContainer implements OnInit {

	private currentFormSearch: DepartmentSearchReq;

	public pagination: PaginationModel;
	public columnDefs;
	public rowData: Department[];

	constructor(
		private matDialog: MatDialog,
		private departmentService: DepartmentService,
		private spinnerService: SpinnerService,
	) { }

	public ngOnInit(): void {
		this.pagination = new PaginationModel();
		this.initColumn();
	}

	private initColumn(): void {
		this.columnDefs = [
			{
				headerName: 'Mã',
				headerTooltip: 'Mã',

				minWidth: 100,
				cellStyle: BASE_STYLE,
				field: 'code',
				tooltipField: 'code'
			},
			{
				headerName: 'Địa chỉ',
				headerTooltip: 'Địa chỉ',
				field: 'address',
				tooltipField: 'address',
				cellStyle: BASE_STYLE,
				minWidth: 200,
			},

			{
				headerName: 'Thời gian mở cửa',
				headerTooltip: 'Thời gian mở cửa',

				minWidth: 100,
				cellStyle: BASE_STYLE,
				field: 'openTime',
				tooltipField: 'openTime'
			},

			{
				headerName: 'Thời gian đóng cửa',
				headerTooltip: 'Thời gian đóng cửa',

				minWidth: 100,
				cellStyle: BASE_STYLE,
				field: 'closeTime',
				tooltipField: 'closeTime'
			},

			{
				headerName: 'Điện thoại',
				headerTooltip: 'Điện thoại',

				minWidth: 100,
				cellStyle: BASE_STYLE,
				field: 'telephone',
				tooltipField: 'telephone'
			},

			{
				headerName: 'Trạng thái',
				headerTooltip: 'Trạng thái',
		
				minWidth: 150,
		
				cellRenderer: StatusComponent,
				values: ['Không hoạt động', 'Hoạt động'],
				backgrounds: ['#FFEDE4', '#F4FEFF'],
				colors: ['#DF642A', '#00A3AE'],
		
				cellStyle: BASE_STYLE
			},

			{
				headerName: 'Quản lý',
				headerTooltip: 'Quản lý',

				minWidth: 100,
				cellStyle: BASE_STYLE,
				field: 'manager.username',
				tooltipField: 'manager.username'
			},

			{
				cellRenderer: ActionComponent,
				minWidth: 50,
				maxWidth: 50,
				cellStyle: {
					'overflow': 'unset'
				}
			}
		]
	}

	public doSearch(data?: DepartmentSearchReq, page?: number): void {
		if (data) this.currentFormSearch = data;
		if (page) this.pagination.currentPage = page;
		this.spinnerService.isLoading(true);
		this.departmentService.searchDepartment({
			page: this.pagination.currentPage,
			pageSize: DEFAULT_PAGE_SIZE,
			data: this.currentFormSearch
		}).subscribe(res => {
			this.spinnerService.isLoading(false);
			this.rowData = res.data;
            this.pagination.dataLength = this.rowData.length;
            this.pagination.totalPage = res.totalPage;
            this.pagination.totalRecord = res.total;
		})
	}

	public openDepartment(): void {
		this.matDialog.open(CreateUpdateDepartmentComponent, {
			width: '500px',
			data: null,
		}).afterClosed().subscribe(res => {
			if (res) this.doSearch();
		})
	}

	public onGridReady(event: GridReadyEvent): void {
		event.api.sizeColumnsToFit();
	}

	
    public gridSizeChanged(event: GridSizeChangedEvent): void {
        event.api.sizeColumnsToFit();
    }
}