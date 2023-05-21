import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { AppointmentResponse } from "../../models/appointment.model";
import { AppointmentContainer } from "../../appointment.container";
import { AppointmentService } from "../../services/appointment.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmComponent } from "src/app/base/core/components/popup-confirm/popup-confirm.component";
import { ACTION_CLOSE } from "src/app/base/_helpers/constant";
import { SpinnerService } from "src/app/base/core/services/spinner.service";
import { ToastrService } from "ngx-toastr";
import { AppointmentStatus } from "../../constant/appointment.enum";
import { AppointmentDetailComponent } from "../appointment-detail/appointment-detail.component";
import { ConfirmApproveComponent } from "../confirm-approve/popup-confirm.component";

@Component({
    selector: 'app-appointment-action',
    templateUrl: './appointment-action.component.html',
    styleUrls: ['./appointment-action.component.scss']
})
export class AppointmentActionComponent implements ICellRendererAngularComp {

    params;
    data: AppointmentResponse;
    context: AppointmentContainer;

    public get status() {
        return this.data.status;
    }

    constructor(
        private appointService: AppointmentService,
        private matDialog: MatDialog,
        private spinnerService: SpinnerService,
        private toastrService: ToastrService,
    ) {}

    refresh(params: ICellRendererParams): boolean {
        return true;
    }

    agInit(params: ICellRendererParams): void {
        this.params = params;
        this.data = this.params.data;
        this.context = params.context;
    }

    onDetail(): void {
        this.matDialog.open(AppointmentDetailComponent, {
            width: '500px',
            data: this.data
        })
    }


    onCancel(): void {
        this.matDialog.open(ConfirmComponent, {
            width: '500px',
            data: {
                title: 'Thông báo',
                withReason: true,
            }
        }).afterClosed().subscribe(res => {
            if (res !== ACTION_CLOSE) {
                this.spinnerService.isLoading(true);
                this.appointService.cancelAppointment({
                    id: this.data.id,
                    reason: res
                }).subscribe(res => {
                    this.toastrService.success('Hủy lịch hẹn thành công.');
                    this.context.doSearch();
                })
            }
        })
    }

    onApprove(): void {
        this.matDialog.open(ConfirmApproveComponent, {
            width: '500px',
            data: {
                title: 'Bạn có đồng ý phê duyệt lịch hẹn.',
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                this.spinnerService.isLoading(true);
                this.appointService.approveAppointment(this.data.id, res)
                    .subscribe(res => {
                        this.toastrService.success('Phê duyệt lịch hẹn thành công.');
                        this.context.doSearch();
                    })
            }
        })
    }

    onFinish(): void {
        this.matDialog.open(ConfirmComponent, {
            width: '500px',
            data: {
                title: 'Thông báo',
                message: 'Bạn có chắc chắn đã hoàn thành buổi hẹn.'
            }
        }).afterClosed().subscribe(res => {
            if (res !== ACTION_CLOSE) {
                this.spinnerService.isLoading(true);
                this.appointService.finishAppointment(this.data.id)
                    .subscribe(res => {
                        this.toastrService.success('Hoàn thành lịch hẹn thành công.');
                        this.context.doSearch();
                    })
            }
        })
    }
}