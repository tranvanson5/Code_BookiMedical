import { StatisticAppointmentContainer } from './statistic-appointment.container';
import { FormSearchStatistic } from './components/form-search/form-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule, CurrencyPipe, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { StatisticAppointmentRoutingModule } from './statistic-appointment-routing.module';
import { StatisticCommonModule } from '../common/statistic-common.module';

const imports = [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    StatisticAppointmentRoutingModule,
    StatisticCommonModule
];
const declarations = [
    StatisticAppointmentContainer,
    FormSearchStatistic,
];

@NgModule({
    imports: imports,
    declarations: declarations,
    providers: [CurrencyPipe, DatePipe]
})
export class StatisticAppointmentModule {}