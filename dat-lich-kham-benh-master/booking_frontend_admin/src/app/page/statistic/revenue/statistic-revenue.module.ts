import { FormSearchStatistic } from './components/form-search/form-search.component';
import { CoreModule } from 'src/app/base/core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule, CurrencyPipe, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { AgGridModule } from "ag-grid-angular";
import { StatisticRevenueRoutingModule } from "./statistic-revenue-routing.module";
import { StatisticRevenueContainer } from "./statistic-revenue.container";
import { RevenueComponent } from './components/revenue-yearly/revenue.component';
import { StatisticCommonModule } from '../common/statistic-common.module';
import { TopProductComponent } from './components/top-product/top-product.component';
import { RevenueMonthlyComponent } from './components/revenue-monthly/revenue-monthly.component';

const imports = [
    CoreModule,
    CommonModule,
    NgxChartsModule,
    AgGridModule.forRoot([]),
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    StatisticRevenueRoutingModule,
    StatisticCommonModule,
];
const declarations = [
    StatisticRevenueContainer,
    FormSearchStatistic,
    RevenueComponent,
    TopProductComponent,
    RevenueMonthlyComponent
];

@NgModule({
    imports: imports,
    declarations: declarations,
    providers: [CurrencyPipe, DatePipe]
})
export class StatisticRevenueModule {}