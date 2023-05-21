import { Component, OnInit } from "@angular/core";
import { ColDef, GridReadyEvent, GridSizeChangedEvent } from "ag-grid-community";
import { DEFAULT_PAGE_SIZE } from "src/app/base/_helpers/constant";
import { PaginationModel } from "src/app/base/core/models/pagination.model";
import { SpinnerService } from "src/app/base/core/services/spinner.service";
import { USER_COLUMN } from "./constant/user.column";
import { UserModel } from "./models/user.model";
import { UserService } from "./services/user.service";
import { MatDialog } from "@angular/material/dialog";
import { CreateUserComponent } from "./components/create/create-user.component";

@Component({
    selector: 'app-user-container',
    templateUrl: './user.container.html',
})
export class UserContainer implements OnInit {

    public columnDef: (ColDef | any)[];
    public rowData: UserModel[];
    public pagination: PaginationModel;
    public currentFormSearch: UserModel;


    constructor(
        private userService: UserService,
        private spinnerService: SpinnerService,
        private matDialog: MatDialog
    ) {}

    public ngOnInit(): void {
        this.pagination = new PaginationModel();
        this.columnDef = USER_COLUMN;
    }

    public doSearch(user?: UserModel, page?: number): void {
        if (user) this.currentFormSearch = user;
        if (page) this.pagination.currentPage = page;
        this.spinnerService.isLoading(true);
        this.userService.searchUser({
            page: this.pagination.currentPage,
            pageSize: DEFAULT_PAGE_SIZE,
            data: this.currentFormSearch
        })
        .subscribe(res => { 
            this.spinnerService.isLoading(false);
            this.rowData = res.data;
            this.pagination.dataLength = this.rowData.length;
            this.pagination.totalPage = res.totalPage;
            this.pagination.totalRecord = res.total;
        })
    }

    openCreate(): void {
        this.matDialog.open(CreateUserComponent, {
            width: '500px',
        }).afterClosed().subscribe(event => {
            if (event.action === 'save') 
                this.doSearch(this.currentFormSearch, this.pagination.currentPage);
        })
    }
   
    public gridSizeChanged(event: GridSizeChangedEvent): void {
        event.api.sizeColumnsToFit();
    }

    public onGridReady(event: GridReadyEvent): void {
        event.api.sizeColumnsToFit();
    }
}