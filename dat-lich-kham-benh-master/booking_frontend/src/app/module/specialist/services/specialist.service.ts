import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { BookingBackend } from "src/app/core/services/booking.service";
import { Specialist } from "../models/specialist.model";

@Injectable({
    providedIn: 'root'
})
export class SpecialistService {

    private bookingBackend = inject(BookingBackend);

    public findActiveSpecialist(): Observable<Specialist[]> {
        return this.bookingBackend.get<Specialist[]>('/specialists');
    }
}