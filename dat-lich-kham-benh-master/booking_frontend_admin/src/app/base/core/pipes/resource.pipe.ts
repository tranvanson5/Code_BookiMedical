import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "src/environments/environment";

@Pipe({
    name: 'resource'
})
export class ResourcePipe implements PipeTransform {

    transform(value: string, host?: string) {
        if (host) return `${host}/${value}`;
        return `${environment.API_GATEWAY_USER}/resource${value}`;
    }
}