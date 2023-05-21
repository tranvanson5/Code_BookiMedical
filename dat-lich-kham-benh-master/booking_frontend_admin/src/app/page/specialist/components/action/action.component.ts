import { Component } from "@angular/core";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { ToastrService } from "ngx-toastr";
import { SpinnerService } from "src/app/base/core/services/spinner.service";
import { Specialist } from "../../models/specialist.model";
import { SpecialistService } from "../../services/specialist.service";
import { ACTION_ACCEPT } from './../../../../base/_helpers/constant';
import { ConfirmComponent } from './../../../../base/core/components/popup-confirm/popup-confirm.component';
import { CreateUpdateSpecialistComponent } from "../create-update-specialist/create-update-specialist.component";

@Component({
    selector: 'app-action-grid',
    templateUrl: './action-grid.component.html',
    styleUrls: ['./action-grid.component.scss']
})
export class ActionComponent implements ICellRendererAngularComp {

    params;
    data: Specialist;
    context;
    public matDialogRef: MatDialogRef<void>;

    constructor(
        private toastrService: ToastrService,
        private spinnerService: SpinnerService,
        private matDialog: MatDialog,
        private specialistService: SpecialistService,
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
        this.matDialog.open(CreateUpdateSpecialistComponent, {
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
                message: 'Bạn có đống ý mở chuyên khoa này?'
            }
        }).afterClosed().subscribe(res => {
            if (res == ACTION_ACCEPT) {
                this.spinnerService.isLoading(true);
                this.specialistService.changeStatus(this.data.id)
                    .subscribe(res => {
                        this.spinnerService.isLoading(false);
                        this.toastrService.success('Mở chuyên khoa thành công.')
                        this.context.doSearch();
                    })
            }
        })
    }

    onBlock(): void {
        this.matDialog.open(ConfirmComponent, {
            data: {
                title: 'Xác nhận',
                message: 'Bạn có chắc chắn khóa chuyên khoa này?'
            }
        }).afterClosed().subscribe(res => {
            if (res == ACTION_ACCEPT) {
                this.spinnerService.isLoading(true);
                this.specialistService.changeStatus(this.data.id)
                    .subscribe(res => {
                        this.spinnerService.isLoading(false);
                        this.toastrService.success('Khóa chuyên khoa thành công.')
                        this.context.doSearch();
                    })
            }
        })
    }
}