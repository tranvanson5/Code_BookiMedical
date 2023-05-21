import { NgModule } from '@angular/core';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CollapseComponent } from './components/collapse/collapse.component';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
    imports: [NgxChartsModule, MatExpansionModule],
    declarations: [BarChartComponent, CollapseComponent],
    exports: [BarChartComponent, CollapseComponent]
})
export class StatisticCommonModule {}