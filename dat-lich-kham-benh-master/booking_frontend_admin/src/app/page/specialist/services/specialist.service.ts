import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Specialist, SpecialistSearch } from "../models/specialist.model";
import { ResponseServiceModel, SearchModel } from "src/app/base/core/models/search.model";

@Injectable({
    providedIn: 'root'
})
export class SpecialistService {

    constructor(
        private http: HttpClient
    ) {}

    public getAllActive(): Observable<any> {
        return this.http.get<any>(`${environment.API_GATEWAY_USER}/specialists`);
    }

    public changeStatus(id: number): Observable<void> {
        return this.http.get<void>(`${environment.API_GATEWAY}/specialists/change-status`, {
            params: {id}
        })
    }

    public saveSpecialist(request: Specialist): Observable<void> {
        return this.http.post<void>(`${environment.API_GATEWAY}/specialists`, request);
    }

    public searchSpecialist(request: SearchModel<SpecialistSearch>): Observable<ResponseServiceModel<Specialist>> {
        return this.http.post<ResponseServiceModel<Specialist>>(`${environment.API_GATEWAY}/specialists/search`, request);
    }
}