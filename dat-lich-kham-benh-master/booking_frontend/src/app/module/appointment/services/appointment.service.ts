import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { BookingBackend } from "src/app/core/services/booking.service";
import { AppointmentCreationRequest, AppointmentCreationResponse } from "../models/appointment-creation.model";
import { AppointmentMineReq, AppointmentMineRes } from './../models/appointment-mine.model';
import { AppointmentCancelReq } from "../models/appointment-cancel.model";

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {

    private bookingBackend = inject(BookingBackend);

    public createAppointment(data: AppointmentCreationRequest): Observable<AppointmentCreationResponse> {
        return this.bookingBackend.post<AppointmentCreationResponse>('/appointments', data);
    }

    public getMyAppointment(request: AppointmentMineReq): Observable<AppointmentMineRes> {
        return this.bookingBackend.post<AppointmentMineRes>('/appointments/my-appointment', request);
    }

    public cancelAppointment(request: AppointmentCancelReq): Observable<void> {
        return this.bookingBackend.post<void>('/appointments/cancel', request);
    }
}