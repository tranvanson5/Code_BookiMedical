import { Component, OnInit } from "@angular/core";
import { Observable, forkJoin } from "rxjs";
import { tap } from 'rxjs/operators';
import { ResponseServiceModel } from 'src/app/base/core/models/search.model';
import { SpinnerService } from "src/app/base/core/services/spinner.service";
import { OverallAppointment } from '../../appointment/models/appointment.model';
import { AppointmentService } from '../../appointment/services/appointment.service';
import { HisChangeStatus } from "../../user/models/user.model";
import { Chart } from "../common/model/chart.model";

@Component({
    selector: 'app-statistic-appointment',
    templateUrl: './statistic-appointment.container.html',
    styleUrls: ['./statistic-appointment.container.scss']
})
export class StatisticAppointmentContainer implements OnInit {

    public his$: Observable<ResponseServiceModel<HisChangeStatus>>;
    public overall$: Observable<OverallAppointment>;
    public status$: Observable<[Chart[], Chart[], Chart[], Chart[]]>;

    constructor(
        private appointmentService: AppointmentService,
        private spinnerService: SpinnerService
    ) { }

    public ngOnInit(): void {
        this.overall$ = this.appointmentService.getOverallAppointment();
    }

    public getChart(event: any): void {
        this.spinnerService.isLoading(true);
        this.status$ = forkJoin([
            this.appointmentService.statisticAppointment({...event, status: 'PENDING'}),
            this.appointmentService.statisticAppointment({...event, status: 'APPROVED'}),
            this.appointmentService.statisticAppointment({...event, status: 'CANCEL'}),
            this.appointmentService.statisticAppointment({...event, status: 'DONE'}),
        ]).pipe(
            tap(res => this.spinnerService.isLoading(false))
        );
    }
}