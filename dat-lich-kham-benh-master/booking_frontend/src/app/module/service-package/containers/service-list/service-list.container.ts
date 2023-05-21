import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { PagingComponent } from 'src/app/module/shared';
import { PagingResponse } from 'src/app/module/shared/paging/models/paging.model';
import { ServiceInfoComponent } from '../../components/service-info/service-info.component';
import { ServicePackage } from './../../models/service-package.model';

@Component({
    selector: 'app-service-list',
    templateUrl: './service-list.container.html',
    styleUrls: ['./service-list.container.scss'],
    standalone: true,
    imports: [
        ServiceInfoComponent,
        NgIf,
        NgFor,
        PagingComponent,
        AsyncPipe,
        RouterLink
    ]
})
export class ServiceListContainer {

    @Input()
    public servicePackage: Observable<PagingResponse<ServicePackage>>;

    @Input()
    public shop: boolean;

    @Input()
    public title: string;

    @Input()
    public isPaging: boolean = true;

    @Output()
    public paginate = new EventEmitter<number>();
}