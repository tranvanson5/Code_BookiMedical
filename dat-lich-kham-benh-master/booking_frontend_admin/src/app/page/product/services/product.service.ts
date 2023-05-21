import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { ResponseServiceModel, SearchModel } from "src/app/base/core/models/search.model";
import { SpinnerService } from "src/app/base/core/services/spinner.service";
import { environment } from "src/environments/environment";
import { ResponseService } from '../../../base/core/models/response.model';
import { FormSearchProductModel } from "../models/form-search-product.model";
import { ProductModel } from "../models/product.model";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(
        private http: HttpClient,
        private spinnerService: SpinnerService,
    ) { }

    public getAll(): Observable<ProductModel[]> {
        return this.http.get<ProductModel[]>(`${environment.API_GATEWAY}/products`);
    }

    public doSearch(searchData: SearchModel<FormSearchProductModel>): Observable<ResponseServiceModel<ProductModel>> {
        this.spinnerService.isLoading(true);
        return this.http
            .post<ResponseServiceModel<ProductModel>>(`${environment.API_GATEWAY}/products/search`, searchData)
            .pipe(
                tap(res => this.spinnerService.isLoading(false))
            )
    }

    public createProduct(product): Observable<ResponseService<void>> {
        return this.http
            .post<ResponseService<void>>(`${environment.API_GATEWAY}/products`, product);

    }

    public updateProduct(product): Observable<ResponseService<void>> {
        return this.http.put<ResponseService<void>>(`${environment.API_GATEWAY}/products`, product);

    }

    public changeStatus(productId): Observable<ResponseService<void>> {
        return this.http.get<ResponseService<void>>(`${environment.API_GATEWAY}/products/change-status`, {
            params: {
                id: productId,
            }
        });
    }
}