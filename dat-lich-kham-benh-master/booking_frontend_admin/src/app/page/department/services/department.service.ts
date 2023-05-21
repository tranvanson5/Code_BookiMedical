import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseServiceModel, SearchModel } from "src/app/base/core/models/search.model";
import { environment } from "src/environments/environment";
import { DepartmentSearchReq } from "../models/department-search.model";
import { Department } from "../models/department.model";

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {

    constructor(
        private http: HttpClient
    ) {}

    public getDepartment(): Observable<Department[]> {
        return this.http.get<Department[]>(`${environment.API_GATEWAY_USER}/departments`);
    }

    public getMyDepartment(): Observable<Department[]> {
        return this.http.get<Department[]>(`${environment.API_GATEWAY_USER}/departments/mine`);
    }

    public searchDepartment(req: SearchModel<DepartmentSearchReq>): Observable<ResponseServiceModel<Department>> {
        return this.http.post<ResponseServiceModel<Department>>(`${environment.API_GATEWAY}/departments/search`, req);
    }

    public saveDepartment(department: Department): Observable<void> {
        return this.http.post<void>(`${environment.API_GATEWAY}/departments`, department);
    }

    public updateDepartment(department: Department): Observable<void> {
        return this.http.put<void>(`${environment.API_GATEWAY}/departments`, department);
    }

    public changeStatus(code: string): Observable<void> {
        return this.http.get<void>(`${environment.API_GATEWAY}/departments/change-status`, {
            params: { code }
        });
    }
}