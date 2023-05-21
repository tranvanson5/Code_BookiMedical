import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Color } from "@swimlane/ngx-charts";
import { Chart } from "../../model/chart.model";

const MIN_RESULT = 10;

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
})
export class BarChartComponent implements OnChanges {

    
    @Input() single: Chart[];

    @Input()
    xLabel: string;

    @Input()
    showXLabel: boolean = false;

    data: Chart[];
    showXAxis = true;
    showYAxis = true;
    gradient = true;
    showLegend = false;
    showYAxisLabel = false;
    
    colorScheme: Color = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
        group: null,
        name: null,
        selectable: null
    };

    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.single?.currentValue) {
            this.data = changes?.single?.currentValue  ?? [];
            if (this.data.length < MIN_RESULT) {
                const max = MIN_RESULT - this.data.length;
                for (let i = 0; i < max; i++) {
                    this.data.push({name: '  '.repeat(i+1), value: 0});
                }
            }
        }
    }

}