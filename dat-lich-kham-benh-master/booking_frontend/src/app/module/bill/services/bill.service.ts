import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { BookingBackend } from "src/app/core";
import { Bill, BillDetail, CheckoutResponse } from "../models/bill.model";
import { PagingRequest, PagingResponse } from "../../shared/paging/models/paging.model";

@Injectable({
    providedIn: 'root'
})
export class BillService {

    private readonly bookingBackend = inject(BookingBackend);

    public checkout(ids: number[]): Observable<CheckoutResponse> {
        return this.bookingBackend.post<CheckoutResponse>('/bills', {cartIds: ids}); 
    }

    public getMyBill(req: PagingRequest<any>): Observable<PagingResponse<Bill>> {
        return this.bookingBackend.post<PagingResponse<Bill>>('/bills/my-bill', req);
    }

    public getBillDetail(id: string): Observable<BillDetail[]> {
        return this.bookingBackend.get<BillDetail[]>(`/bills/${id}/bill-detail`);
    }
}