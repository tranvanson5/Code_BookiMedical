import { Component, inject } from "@angular/core";
import { Observable } from "rxjs";
import { SpinnerService } from "./services/spinner.service";

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
    private spinnerService: SpinnerService = inject(SpinnerService);
    public loading$: Observable<boolean> = this.spinnerService.loading;
}