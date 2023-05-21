import { Component, Input, OnInit, inject } from "@angular/core";
import { ServiceListContainer } from "../service-list/service-list.container";
import { AsyncPipe, NgIf } from "@angular/common";
import { Observable, tap } from "rxjs";
import { PagingResponse } from "src/app/module/shared/paging/models/paging.model";
import { ServicePackage } from "../../models/service-package.model";
import { ServicePackageService } from "../../services/service-package.service";
import { SpinnerService } from "src/app/module/shared/spinner/services/spinner.service";

@Component({
    selector: 'app-service-container',
    template: `
        <app-service-list
            [title]="'Excellent Medical Services'"
            [servicePackage]="servicePackage$"
            [shop]="true"
            [isPaging]="isPaging"
            (paginate)="paginate($event)"
        ></app-service-list>
    `,
    standalone: true,
    imports: [
        ServiceListContainer,
        AsyncPipe,
        NgIf,
    ]
})
export class ServiceContainer implements OnInit {

    @Input() 
    isPaging: boolean = true;

    pageSize = this.isPaging ? 9 : 3;

    public servicePackage$: Observable<PagingResponse<ServicePackage>>;

    private readonly servicePackageService = inject(ServicePackageService);
    public readonly spinnerService = inject(SpinnerService);

    public ngOnInit(): void {
        this.paginate(1);
    }

    public paginate(page: number): void {
        this.spinnerService.showLoading();
        this.servicePackage$ = this.servicePackageService.searchServicePackage({
            page: page,
            pageSize: this.pageSize,
            data: {}
        }).pipe(
            tap(res => this.spinnerService.hideLoading())
        );
    }
}