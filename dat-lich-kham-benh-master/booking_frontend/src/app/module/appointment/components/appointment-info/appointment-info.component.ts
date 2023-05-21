import { DatePipe, NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ModalService } from "src/app/core/services/modal.service";
import { SpinnerService } from "src/app/module/shared/spinner/services/spinner.service";
import { Appointment } from '../../models/appointment.model';
import { AppointmentService } from "../../services/appointment.service";
import { QRCodeComponent } from "src/app/module/shared";

@Component({
    selector: 'app-appointment-info',
    templateUrl: './appointment-info.component.html',
    styleUrls: ['./appointment-info.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        DatePipe,
        NgbModalModule,
        QRCodeComponent,
    ]
})
export class AppointmentInfoComponent {

    @Input()
    public data: Appointment

    @Output()
    public reload: EventEmitter<void> = new EventEmitter();


    // dependencies
    private readonly toastrService = inject(ToastrService);
    private readonly appointmentService = inject(AppointmentService);
    private readonly modal = inject(ModalService);
    private readonly spinnerService = inject(SpinnerService);

    cancelAppointment(): void {
        if (this.data.status !== 'PENDING') {
            this.toastrService.warning('Bạn không thể thực hiện.');
            return;
        }
        const confirmPopup = this.modal.openConfirmPopup({
            title: 'Xác nhận',
            content: `<p>Bạn có chắc chắn muốn hủy lịch hẹn</p>`,
            withReason: true,
        });
        confirmPopup.dismissed.subscribe(res => {
            if (res) {
                this.spinnerService.showLoading();
                this.appointmentService.cancelAppointment({
                    id: this.data.id,
                    reason: res.reason
                })
                    .subscribe(req => {
                        this.toastrService.success('Hủy lịch hẹn thành công');
                        this.spinnerService.hideLoading();
                        this.reload.emit();
                    })
            }
        })
    }

    openQrCode(): void {
        this.modal.openQrCode(this.data.id, 'Mã QR của lịch đặt.');
    }
}