import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-paging',
    templateUrl: './paging.component.html',
    styleUrls: ['./paging.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        NgbPaginationModule
    ]
})
export class PagingComponent {
    @Input()
    public dataLength: number;

    @Input()
    public page: number;

    @Input()
    public pageSize: number;

    @Input()
    public total: number;

    @Output()
    paginate: EventEmitter<number> = new EventEmitter();
}