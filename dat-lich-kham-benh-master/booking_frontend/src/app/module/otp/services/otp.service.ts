import { Injectable, inject } from "@angular/core";
import { BookingBackend } from "src/app/core";
import { ForgotPasswordReq } from "../models/forgot-password";
import { Observable } from "rxjs";
import { ChangePasswordReq } from "../models/change-password";
import { ConfirmOtpReq } from "../models/confirm-otp";

@Injectable({
    providedIn: 'root'
})
export class OtpService {

    private readonly bookingBackend = inject(BookingBackend);

    public forgotPassword(req: ForgotPasswordReq): Observable<void> {
        return this.bookingBackend.post<void>(`/otp/forgot-password`, req);
    }

    public changePassword(req: ChangePasswordReq): Observable<void> {
        return this.bookingBackend.post<void>(`/otp/change-password`, req);
    }

    public confirmOtp(req: ConfirmOtpReq): Observable<void> {
        return this.bookingBackend.post<void>(`/otp/confirm-otp`, req);
    }

}