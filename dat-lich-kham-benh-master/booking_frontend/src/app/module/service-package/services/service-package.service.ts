import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { BookingBackend } from "src/app/core/services/booking.service";
import { PagingRequest, PagingResponse } from "../../shared/paging/models/paging.model";
import { Item, ServicePackage } from "../models/service-package.model";

@Injectable({
    providedIn: 'root'
})
export class ServicePackageService {

    private readonly bookingBacked = inject(BookingBackend);

    public searchServicePackage(request: PagingRequest<any>): Observable<PagingResponse<ServicePackage>> {
        return this.bookingBacked.post<PagingResponse<ServicePackage>>('/products/search', request);
    }

    public getMyProduct(request: PagingRequest<any>): Observable<PagingResponse<Item>> {
        return this.bookingBacked.post<PagingResponse<Item>>('/products/my-product', request);
    }
}