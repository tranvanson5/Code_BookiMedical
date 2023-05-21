import { BillDetailModel } from './../models/bill-detail.model';
import { environment } from './../../../../environments/environment';
import { ResponseServiceModel } from './../../../base/core/models/search.model';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from './../../../base/core/services/spinner.service';
import { Observable } from 'rxjs';
import { BillModel, BillTree } from './../models/bill.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { SearchModel } from 'src/app/base/core/models/search.model';
import { Chart } from '../../statistic/common/model/chart.model';
import { ProductTree, StatisticProduct } from '../../product/models/product.model';

@Injectable({
    providedIn: 'root'
})
export class BillService {

    constructor(
        private http: HttpClient,
        private spinnerService: SpinnerService,
        private toastrService: ToastrService,
    ) { }

    public search(bill: SearchModel<BillModel>): Observable<ResponseServiceModel<BillModel>> {
        return this.handleResponse<ResponseServiceModel<BillModel>>(
            this.http.post<ResponseServiceModel<BillModel>>(`${environment.API_GATEWAY}/bills/search`, bill)
        )
    }

    public revenueMonthly(year: number): Observable<Chart[]> {
        return this.http.get<Chart[]>(`${environment.API_GATEWAY}/bills/statistic/revenue-monthly`, {
            params: { year }
        })
    }

    public revenueProductMonthly(year: number): Observable<ProductTree[]> {
        return this.http.get<ProductTree[]>(`${environment.API_GATEWAY}/bills/statistic/revenue-product-monthly`, {
            params: { year }
        })
    }

    public getTopProduct({year, limit}): Observable<Chart[]> {
        return this.http.get<Chart[]>(`${environment.API_GATEWAY}/bills/statistic/top-${limit}-product`, {
            params: { year }
        })
    }

    public statisticRevenueYearly(): Observable<BillTree[]> {
        return this.http.get<BillTree[]>(`${environment.API_GATEWAY}/bills/statistic/revenue-yearly`);
    }

    public statisticProduct(req: SearchModel<number>): Observable<ResponseServiceModel<StatisticProduct>> {
        return this.http.post<ResponseServiceModel<StatisticProduct>>(`${environment.API_GATEWAY}/bills/statistic/product`, req);
    }

    public getBillDetial(billId: string): Observable<BillDetailModel[]> {
        return this.handleResponse<BillDetailModel[]>(
            this.http.get<BillDetailModel[]>(`${environment.API_GATEWAY_USER}/bills/${billId}/bill-detail`)
        );
    }

    private handleResponse<T>(response: Observable<T>): Observable<T> {
        this.spinnerService.isLoading(true)
        return response?.pipe(
            tap({
                next: (res: T | any) => {
                    res.message && this.toastrService.success(res.message);
                    this.spinnerService.isLoading(false);
                },
                error: error => {
                    this.toastrService.error(error?.error?.message);
                    this.spinnerService.isLoading(false);
                },
                complete: () => {
                    this.spinnerService.isLoading(false);
                }
            })
        )
    }
}