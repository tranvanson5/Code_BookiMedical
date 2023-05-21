import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
    selector: 'app-form-search-statistic',
    templateUrl: './form-search.component.html',
    styleUrls: ['./form-search.component.scss']
})
export class FormSearchStatistic implements OnInit {

    @Output() search: EventEmitter<{}> = new EventEmitter();
    formGroup: FormGroup;
    now: Date = new Date();

    constructor(
        private fb: FormBuilder,
    ) {}
    public ngOnInit(): void {
        this.formGroup = this.fb.group({
            year: [this.now.getFullYear()],
        })
        this.search.emit(this.formGroup.value);
    }
}