import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public fileTransfer = new Subject<File>();
    public fileTransfer$ = this.fileTransfer.asObservable();

}