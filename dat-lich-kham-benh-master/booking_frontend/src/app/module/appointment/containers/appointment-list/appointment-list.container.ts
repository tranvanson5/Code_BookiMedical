import { AsyncPipe, DatePipe, NgFor, NgIf } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { Observable, tap } from "rxjs";
import { PagingComponent } from "src/app/module/shared";
import { SpinnerService } from "src/app/module/shared/spinner/services/spinner.service";
import { AppointmentInfoComponent } from "../../components/appointment-info/appointment-info.component";
import { AppointmentStatusComponent } from '../../components/appointment-status-color/appointment-status-color.component';
import { AppointmentMineRes } from "../../models/appointment-mine.model";
import { AppointmentService } from "../../services/appointment.service";

@Component({
    selector: 'app-appointment-list-container',
    templateUrl: './appointment-list.container.html',
    styleUrls: ['./appointment-list.container.scss'],
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        DatePipe,
        AsyncPipe,
        PagingComponent,
        AppointmentInfoComponent,
        AppointmentStatusComponent,
    ]
})
export class AppointmentListContainer implements OnInit {
    public page: number;
    public pageSize = 9;

    // data transfer-ui
    public appointments: Observable<AppointmentMineRes>;

    // dependencies
    private readonly appointmentService = inject(AppointmentService);
    private readonly spinnerService = inject(SpinnerService);

    public ngOnInit(): void {
        this.paginate(1);
    }

    paginate(page: number): void {
        this.page = page;
        this.spinnerService.showLoading();
        this.appointments = this.appointmentService.getMyAppointment({
            page: this.page,
            pageSize: this.pageSize,
            data: {

            }
        }).pipe(
            tap(r => {
                this.spinnerService.hideLoading();
            })
        );
    }

}