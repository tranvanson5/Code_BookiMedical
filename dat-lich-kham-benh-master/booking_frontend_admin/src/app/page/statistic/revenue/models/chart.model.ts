export interface ChartModel {
    name: string;
    series: Chart[];
}

interface Chart {
    name: string;
    value: string | number;
}