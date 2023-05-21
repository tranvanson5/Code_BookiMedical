import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppointmentStatusMap } from '../../constant/appointment.enum';

@Component({
    selector: 'app-appointment-detail',
    templateUrl: './appointment-detail.component.html',
    styleUrls: ['./appointment-detail.component.scss']
})
export class AppointmentDetailComponent {

    public get status() {
        return AppointmentStatusMap[this.data.status];
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private matDialogRef: MatDialogRef<AppointmentDetailComponent>,
    ) {}

    doClose(): void {
        this.matDialogRef.close(null);
    }
}