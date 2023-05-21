import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class ResourceService {

    constructor(
        private http: HttpClient,
    ) {}

    public uploadProductImage(image: File, productCode): Observable<{url: string}> {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('code', productCode);
        return this.http.post<{url: string}>(`${environment.API_GATEWAY_USER}/resources/product`, formData);
    }

    public updateUserImage(image: File, username: string): Observable<{url: string}> {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('username', username);
        return this.http.post<{url: string}>(`${environment.API_GATEWAY_USER}/resources`, formData);
    }
}