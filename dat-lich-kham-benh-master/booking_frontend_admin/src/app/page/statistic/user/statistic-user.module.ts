import { StatisticUserContainer } from './statistic-user.container';
import { FormSearchStatistic } from './components/form-search/form-search.component';
import { CoreModule } from 'src/app/base/core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule, CurrencyPipe, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { AgGridModule } from "ag-grid-angular";
import { StatisticUserRoutingModule } from './statistic-user-routing.module';
import { UserGridComponent } from './components/user-grid/user-grid.component';
import { StatisticCommonModule } from '../common/statistic-common.module';

const imports = [
    CoreModule,
    CommonModule,
    AgGridModule.forRoot([]),
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    StatisticUserRoutingModule,
    StatisticCommonModule,
];
const declarations = [
    StatisticUserContainer,
    FormSearchStatistic,
    UserGridComponent
];

@NgModule({
    imports: imports,
    declarations: declarations,
    providers: [CurrencyPipe, DatePipe]
})
export class StatisticUserModule {}