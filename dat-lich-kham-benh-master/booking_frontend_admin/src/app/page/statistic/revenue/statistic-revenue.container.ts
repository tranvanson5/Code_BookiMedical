import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SpinnerService } from 'src/app/base/core/services/spinner.service';
import { BillService } from '../../bill/services/bill.service';
import { Chart } from "../common/model/chart.model";
import { BillTree } from "../../bill/models/bill.model";

@Component({
    selector: 'app-statistic-revenue',
    templateUrl: './statistic-revenue.container.html',
    styleUrls: ['./statistic-revenue.container.scss']
})
export class StatisticRevenueContainer implements OnInit {
    public revenue$: Observable<BillTree[]>
    public top10Product$: Observable<Chart[]>

    constructor(
        private billService: BillService,
        private spinnerService: SpinnerService
    ) {}

    public ngOnInit(): void {
    }

    public statisticRevenueYearly(): void {
        this.spinnerService.isLoading(true);
        this.revenue$ = this.billService.statisticRevenueYearly()
            .pipe(
                tap(res => this.spinnerService.isLoading(false))
            );
    }

    
}