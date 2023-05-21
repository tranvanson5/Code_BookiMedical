import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Authority } from '../models/menu.model';

@Pipe({
    name: 'authority'
})
export class AuthorityPipe implements PipeTransform {

    constructor(
        private authService: AuthService,
    ) {}

    transform(value: Authority[]): boolean {
        if (!value || !value.length) return true;
        return this.authService.isAuthorization(value);
    }

}