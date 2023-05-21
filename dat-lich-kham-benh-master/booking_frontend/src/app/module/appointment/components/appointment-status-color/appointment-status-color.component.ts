import { NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { AppointmentStatus, AppointmentStatusMap } from "../../constant/appointment-status.enum";

@Component({
    selector: 'app-appointment-status',
    templateUrl: './appointment-status-color.component.html',
    styleUrls: ['./appointment-status-color.component.scss'],
    standalone: true,
    imports: [
        NgFor
    ]
})
export class AppointmentStatusComponent {

    public appointmentStatus = [
        {
            code: AppointmentStatus.PENDING,
            name: AppointmentStatusMap.PENDING
        },
        {
            code: AppointmentStatus.APPROVED,
            name: AppointmentStatusMap.APPROVED,
        },
        {
            code: AppointmentStatus.DONE,
            name: AppointmentStatusMap.DONE,
        },
        {
            code: AppointmentStatus.CANCEL,
            name: AppointmentStatusMap.CANCEL,
        }
    ]
}