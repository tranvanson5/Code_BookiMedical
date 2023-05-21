import { Injectable, inject } from "@angular/core";
import { BookingBackend } from "src/app/core/services/booking.service";
import { AccountCreationRequest, AccountCreationResponse } from "../models/account-creation.model";
import { Observable } from "rxjs";
import { JwtResponse } from "src/app/core/models/jwt.model";
import { decode } from 'js-base64';
import { AccountUpdateReq } from "../models/account-update.model";
import { Account } from "../models/account.model";
import { ChangePassword } from "../models/password.model";

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    private readonly bookingBackend = inject(BookingBackend);

    public getCurrentUser(): JwtResponse | null {
        const secret = localStorage.getItem('secret');
        if (secret) return JSON.parse(decode(secret)) as JwtResponse;
        return null;
    }

    public register(request: AccountCreationRequest): Observable<AccountCreationResponse> {
        return this.bookingBackend.post<AccountCreationResponse>('/users', request);
    }

    public updateProfile(request: AccountUpdateReq): Observable<Account> {
        return this.bookingBackend.post<Account>('/users/profile', request);
    }

    public changePassword(password: ChangePassword): Observable<void> {
        return this.bookingBackend.post<void>('/users/change-password', password);
    }
}