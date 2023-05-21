import { Component, OnInit, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PagingResponse } from 'src/app/module/shared/paging/models/paging.model';
import { ServicePackageService } from '../../services/service-package.service';
import { ServiceListContainer } from '../service-list/service-list.container';
import { ServicePackage } from './../../models/service-package.model';
import { AsyncPipe } from '@angular/common';
import { SpinnerService } from 'src/app/module/shared/spinner/services/spinner.service';

@Component({
    selector: 'app-my-product',
    template: `
        <app-service-list
            [title]="'Gói dịch vụ của tôi'"
            [servicePackage]="item$"
            [shop]="false"
            (paginate)="paginate($event)"
        ></app-service-list>
    `,
    standalone: true,
    imports: [
        ServiceListContainer,
        AsyncPipe,
    ]
})
export class MyProductContainer implements OnInit{

    public item$: Observable<PagingResponse<ServicePackage>>;

    private readonly servicePackageService = inject(ServicePackageService);
    private readonly spinnerService = inject(SpinnerService);

    public ngOnInit(): void {
        this.paginate(1);
    }

    public paginate(page: number): void {
        this.spinnerService.showLoading();
        this.item$ = this.servicePackageService.getMyProduct({
            page: page,
            pageSize: 9,
            data: {}
        }).pipe(
            tap(res => this.spinnerService.hideLoading())
        );
    }

}