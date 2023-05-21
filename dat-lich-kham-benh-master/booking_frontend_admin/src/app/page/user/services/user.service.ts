import { HisChangeStatus, OverallUser } from './../models/user.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { ResponseServiceModel, SearchModel } from "src/app/base/core/models/search.model";
import { environment } from "src/environments/environment";
import { ResponseSearchUser, UserModel } from "../models/user.model";
import { Chart } from '../../statistic/common/model/chart.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient,
    ) {}

    public createAdminUser(user): Observable<void> {
        return this.http.post<void>(`${environment.API_GATEWAY}/users`, user);
    }

    public searchUser(search: SearchModel<UserModel>): Observable<ResponseSearchUser> {
        return this.http.post<ResponseSearchUser>(`${environment.API_GATEWAY}/users/search`, search);
    }

    public getManagers(): Observable<UserModel[]> {
        return this.http.get<UserModel[]>(`${environment.API_GATEWAY}/users/managers`);
    }

    public activeUser(userId: number): Observable<void> {
        return this.http.get<void>(`${environment.API_GATEWAY}/users/active`, {
            params: { userId }
        })
    }

    public inactiveUser(userId: number): Observable<void> {
        return this.http.get<void>(`${environment.API_GATEWAY}/users/in-active`, {
            params: { userId }
        })
    }

    public getListAuthority(): Observable<any> {
        return this.http.get<any>(`${environment.API_GATEWAY}/authorities`);
    }

    public getOverallUser(): Observable<OverallUser> {
        return this.http.get<OverallUser>(`${environment.API_GATEWAY}/users/overall`);
    }

    public statisticChangeStatusUser(year, status): Observable<Chart[]> {
        return this.http.get<Chart[]>(`${environment.API_GATEWAY}/users/statistic/change-status`, {
            params: { year, status }
        })
        .pipe(
            tap(res => {
                res.forEach(x => {
                    x.name = x.name.replace('Tháng ', '');
                })
            })
        )
    }

    public getHisChangeStatus(req: SearchModel<{year: number; username?: string}>): Observable<ResponseServiceModel<HisChangeStatus>> {
        return this.http.post<ResponseServiceModel<HisChangeStatus>>(`${environment.API_GATEWAY}/users/statistic/his-change-status`, req);
    }
}