import { DEFAULT_PAGE_SIZE } from './../../../base/_helpers/constant';
import { Component, OnInit } from "@angular/core";
import { Observable, forkJoin } from "rxjs";
import { HisChangeStatus, OverallUser } from "../../user/models/user.model";
import { UserService } from "../../user/services/user.service";
import { SpinnerService } from "src/app/base/core/services/spinner.service";
import { tap } from 'rxjs/operators';
import { ResponseServiceModel } from 'src/app/base/core/models/search.model';
import { Chart } from '../common/model/chart.model';



@Component({
    selector: 'app-statistic-user',
    templateUrl: './statistic-user.container.html',
    styleUrls: ['./statistic-user.container.scss']
})
export class StatisticUserContainer implements OnInit {

    public his$: Observable<ResponseServiceModel<HisChangeStatus>>;
    public overall$: Observable<OverallUser>;
    public status$: Observable<[Chart[], Chart[]]>;

    private year: number;
    private page: number;

    constructor(
        private userService: UserService,
        private spinnerService: SpinnerService
    ) { }

    public ngOnInit(): void {
        this.overall$ = this.userService.getOverallUser();
    }

    public getChart(event): void {
        this.year = event.year;
        this.spinnerService.isLoading(true);
        this.status$ = forkJoin([
            this.userService.statisticChangeStatusUser(this.year, 1),
            this.userService.statisticChangeStatusUser(this.year, 0),
        ]).pipe(
            tap(res => this.spinnerService.isLoading(false))
        );
        this.getHis(1);
    }

    public getHis(page: number | null, username?: string): void {
        if (page) this.page = page;
        this.spinnerService.isLoading(true);
        this.his$ = this.userService.getHisChangeStatus({
            page: this.page,
            pageSize: DEFAULT_PAGE_SIZE,
            data: {
                year: this.year,
                username: username
            }
        })
        .pipe(
            tap(res => this.spinnerService.isLoading(false))
        );
    }
}