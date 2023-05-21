import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { SearchModel } from "src/app/base/core/models/search.model";
import { environment } from "src/environments/environment";
import { OverallAppointment, ResponseSearchAppointment } from "../models/appointment.model";
import { AppointmentCancelReq } from "../models/appontment-cancel.model";
import { Chart } from "../../statistic/common/model/chart.model";

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {

    constructor(
        private http: HttpClient,
    ) {}

    public getOverallAppointment(): Observable<OverallAppointment> {
        return this.http.get<OverallAppointment>(`${environment.API_GATEWAY}/appointments/statistic/overall`);
    }

    public statisticAppointment(req: {year: number, departmentId?: string, status: 'PENDING' | 'APPROVED' | 'CANCEL' | 'DONE'}): Observable<Chart[]> {
        return this.http.post<Chart[]>(`${environment.API_GATEWAY}/appointments/statistic`, req)
            .pipe(
                tap(res => {
                    res.forEach(x => {
                        x.name = x.name.replace('Tháng ', '');
                    })
                })
            )
    }

    public searchAppointmentAndPagination(search: SearchModel<any>): Observable<ResponseSearchAppointment> {
        return this.http.post<ResponseSearchAppointment>(`${environment.API_GATEWAY_USER}/appointments/search`, search)
    }

    public cancelAppointment(req: AppointmentCancelReq): Observable<void> {
        return this.http.post<void>(`${environment.API_GATEWAY_USER}/appointments/cancel`, req);
    }

    public approveAppointment(appointmentId: string, specialistId: number): Observable<void> {
        return this.http.get<void>(`${environment.API_GATEWAY}/appointments/approve`, {
            params: {
                appointmentId,
                specialistId
            }
        })
    }

    public finishAppointment(appointmentId: string): Observable<void> {
        return this.http.get<void>(`${environment.API_GATEWAY}/appointments/finish`, {
            params: {
                appointmentId
            }
        })
    }
}