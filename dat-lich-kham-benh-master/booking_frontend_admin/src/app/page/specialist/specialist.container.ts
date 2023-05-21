import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
	GridReadyEvent,
	GridSizeChangedEvent
} from 'ag-grid-community';
import { BASE_STYLE, DEFAULT_PAGE_SIZE } from 'src/app/base/_helpers/constant';
import { StatusComponent } from "src/app/base/core/components/cells/status/status.component";
import { PaginationModel } from "src/app/base/core/models/pagination.model";
import { SpinnerService } from "src/app/base/core/services/spinner.service";
import { ActionComponent } from './components/action/action.component';
import { CreateUpdateSpecialistComponent } from "./components/create-update-specialist/create-update-specialist.component";
import { Specialist, SpecialistSearch } from "./models/specialist.model";
import { SpecialistService } from "./services/specialist.service";

@Component({
	selector: 'app-specialist-container',
	templateUrl: './specialist.container.html',
	styleUrls: ['./specialist.container.scss']
})
export class SpecialistContainer implements OnInit {

	private currentFormSearch: SpecialistSearch;

	public pagination: PaginationModel;
	public columnDefs;
	public rowData: Specialist[];

	constructor(
		private matDialog: MatDialog,
		private specialistService: SpecialistService,
		private spinnerService: SpinnerService,
	) { }

	public ngOnInit(): void {
		this.pagination = new PaginationModel();
		this.initColumn();
	}

	private initColumn(): void {
		this.columnDefs = [
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
				headerName: 'Tên',
				headerTooltip: 'Tên',
				field: 'name',
				tooltipField: 'name',
				cellStyle: BASE_STYLE,
				minWidth: 200,
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
				headerName: 'Ngày tạo',
				headerTooltip: 'Ngày tạo',

				minWidth: 100,
				cellStyle: BASE_STYLE,
				field: 'createdDate',
				tooltipField: 'createdDate'
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

	public doSearch(data?: SpecialistSearch, page?: number): void {
		if (data) this.currentFormSearch = data;
		if (page) this.pagination.currentPage = page;
		this.spinnerService.isLoading(true);
		this.specialistService.searchSpecialist({
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

	public openSpecialist(): void {
		this.matDialog.open(CreateUpdateSpecialistComponent, {
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