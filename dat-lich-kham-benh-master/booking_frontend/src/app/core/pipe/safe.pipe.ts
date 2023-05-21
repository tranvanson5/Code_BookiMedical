import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'safe',
    standalone: true
})
export class SafePipe implements PipeTransform {

    constructor(
        private _: DomSanitizer
    ) { }

    public transform(value: any, type: string): any {
        if (!type) {
            return this._.bypassSecurityTrustHtml(value);
        }

        switch (type) {
            case 'html':
                return this._.bypassSecurityTrustHtml(value);
            case 'css':
                return this._.bypassSecurityTrustStyle(value);
            case 'resourceUrl':
                return this._.bypassSecurityTrustResourceUrl(value);
            case 'url':
                return this._.bypassSecurityTrustUrl(value);
            default:
                return this._.bypassSecurityTrustHtml(value);
        }
    }
}