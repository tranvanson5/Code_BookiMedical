import { Injectable, inject } from '@angular/core';
import { BookingBackend } from './booking.service';
import { JwtRequest, JwtResponse } from '../models/jwt.model';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private bookingBackend = inject(BookingBackend);
    private router = inject(Router);

    public get authenticated(): boolean {
        const secret = window.localStorage.getItem('secret');
        if (!secret) return false;
        const jwtResponse = JSON.parse(window.atob(secret)) as JwtResponse;
        return !!jwtResponse.jwt;
    }

    public login(request: JwtRequest): Observable<JwtResponse> {
        return this.bookingBackend.post<JwtResponse>('/auth/login', request)
    }

    public logout(): Observable<void> {
        return this.bookingBackend.post<void>('/auth/logout', {})
            .pipe(
                tap(res => {
                    window.localStorage.removeItem('secret');
                    this.router.navigate(['auth', 'login']);
                })
            );
    }

}