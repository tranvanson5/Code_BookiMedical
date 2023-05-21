import { Injectable, inject } from "@angular/core";
import { BookingBackend } from "./booking.service";
import { Observable } from "rxjs";
import { ResourceRes } from "../models/resource.model";

@Injectable({
    providedIn: 'root'
})
export class ResourceService {

    private readonly bookingBackend = inject(BookingBackend);

    public uploadImage(file: File): Observable<ResourceRes> {
        const formData = new FormData();
        formData.append('file', file);
        return this.bookingBackend.post<ResourceRes>('/resources', formData);
    }
}