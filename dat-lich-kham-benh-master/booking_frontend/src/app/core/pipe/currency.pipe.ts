import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'currency',
    standalone: true
})
export class CurrencyPipe implements PipeTransform {

    transform(value: any, type: string) {
        return new Intl.NumberFormat(
            'vi-VN', 
            { style: 'currency', currency: type }
        )
        .format(parseInt(value));
    }
}