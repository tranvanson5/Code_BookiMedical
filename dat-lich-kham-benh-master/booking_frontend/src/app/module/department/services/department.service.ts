import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { BookingBackend } from "src/app/core/services/booking.service";
import { Department } from "../models/department.model";

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {

    private httpClient: BookingBackend = inject(BookingBackend);

    public getActiveDepartment(): Observable<Department[]> {
        return this.httpClient.get<Department[]>('/departments');
    }
}