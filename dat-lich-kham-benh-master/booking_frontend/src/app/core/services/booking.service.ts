import { environment } from './../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BookingBackend extends HttpClient {

    public override get<T>(url: string, options?: Object): Observable<T> {
        url = environment.apiUrl + url;
        return super.get<T>(url, options);
    }

    public override post<T>(url: string, body: any | null, options?: Object): Observable<T> {
        url = environment.apiUrl + url;
        return super.post<T>(url, body, options);
    }

    public override put<T>(url: string, body: any | null, options?: Object): Observable<T> {
        url = environment.apiUrl + url;
        return super.put<T>(url, body, options);
    }

    public override delete<T>(url: string, options?: Object): Observable<T> {
        url = environment.apiUrl + url;
        return super.delete<T>(url, options);
    }
}