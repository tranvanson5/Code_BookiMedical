import { Observable } from 'rxjs';
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ACTION_ACCEPT, ACTION_CLOSE } from "src/app/base/_helpers/constant";
import { SpecialistService } from "src/app/page/specialist/services/specialist.service";

@Component({
    selector: 'app-confirm',
    templateUrl: './popup-confirm.component.html',
    styleUrls: ['./popup-confirm.component.scss']
})
export class ConfirmApproveComponent implements OnInit {

    reason: string;
    specialists$: Observable<any>;
    specialistId: number;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private matDialogRef: MatDialogRef<ConfirmApproveComponent>,
        private specialistService: SpecialistService,
    ) {}

    public ngOnInit(): void {
        this.specialists$ = this.specialistService.getAllActive();
    }

    public doClose(): void {
        this.matDialogRef.close(null);
    }

    public doAccept(): void {
        if (!this.specialistId) return;
        this.matDialogRef.close(this.specialistId);
    }
}