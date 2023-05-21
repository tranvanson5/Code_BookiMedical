import { Component } from "@angular/core";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { ToastrService } from "ngx-toastr";
import { SpinnerService } from "src/app/base/core/services/spinner.service";
import { Department } from "../../models/department.model";
import { DepartmentService } from "../../services/department.service";
import { CreateUpdateDepartmentComponent } from "../create-update-department/create-update-department.component";
import { ACTION_ACCEPT } from './../../../../base/_helpers/constant';
import { ConfirmComponent } from './../../../../base/core/components/popup-confirm/popup-confirm.component';

@Component({
    selector: 'app-action-grid',
    templateUrl: './action-grid.component.html',
    styleUrls: ['./action-grid.component.scss']
})
export class ActionComponent implements ICellRendererAngularComp {

    params;
    data: Department;
    context;
    public matDialogRef: MatDialogRef<void>;

    constructor(
        private toastrService: ToastrService,
        private spinnerService: SpinnerService,
        private matDialog: MatDialog,
        private departmentService: DepartmentService,
    ) {}

    refresh(params: ICellRendererParams): boolean {
        return true;
    }

    agInit(params: ICellRendererParams): void {
        this.params = params;
        this.data = this.params.data;
        this.context = this.params.context;
    }

    onEdit(): void {
        this.matDialog.open(CreateUpdateDepartmentComponent, {
            width: '500px',
            data: this.data,
        }).afterClosed().subscribe(res => {
            if (res) this.context.doSearch();
        })
    }

    onActive(): void {
        this.matDialog.open(ConfirmComponent, {
            data: {
                title: 'Xác nhận',
                message: 'Bạn có đống ý mở chi nhánh này?'
            }
        }).afterClosed().subscribe(res => {
            if (res == ACTION_ACCEPT) {
                this.spinnerService.isLoading(true);
                this.departmentService.changeStatus(this.data.code)
                    .subscribe(res => {
                        this.spinnerService.isLoading(false);
                        this.toastrService.success('Mở chi nhánh thành công.')
                        this.context.doSearch();
                    })
            }
        })
    }

    onBlock(): void {
        this.matDialog.open(ConfirmComponent, {
            data: {
                title: 'Xác nhận',
                message: 'Bạn có chắc chắn khóa chi nhánh này?'
            }
        }).afterClosed().subscribe(res => {
            if (res == ACTION_ACCEPT) {
                this.spinnerService.isLoading(true);
                this.departmentService.changeStatus(this.data.code)
                    .subscribe(res => {
                        this.spinnerService.isLoading(false);
                        this.toastrService.success('Khóa chi nhánh thành công.')
                        this.context.doSearch();
                    })
            }
        })
    }
}