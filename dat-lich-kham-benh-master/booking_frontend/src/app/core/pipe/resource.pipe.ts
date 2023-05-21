import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "src/environments/environment";

@Pipe({
    name: 'resource',
    standalone: true
})
export class ResourcePipe implements PipeTransform {

    transform(value: any, host?: string): string {
        return (host || environment.resourceUrl) + value;
    }
}