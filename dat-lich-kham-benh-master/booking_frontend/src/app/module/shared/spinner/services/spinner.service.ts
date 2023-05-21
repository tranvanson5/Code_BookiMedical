import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {

    readonly loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    readonly loading$: Observable<boolean> = this.loading.asObservable();

    public showLoading(): void {
        this.loading.next(true);
    }

    public hideLoading(): void {
        this.loading.next(false);
    }
}