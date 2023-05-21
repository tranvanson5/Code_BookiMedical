import { STATUS } from 'src/app/base/_helpers/constant';
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';
import { DepartmentSearchReq } from '../../models/department-search.model';

@Component({
    selector: 'app-form-search',
    templateUrl: './form-search.component.html',
    styleUrls: ['./form-search.component.scss']
})
export class FormSearchDepartmentComponent implements OnInit {

    public formGroup: FormGroup;
    public status = STATUS

    @Output() search: EventEmitter<DepartmentSearchReq> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
    ) {}

    public ngOnInit(): void {
        this.initForm();
        this.submit();
    }

    private initForm(): void {
        this.formGroup = this.fb.group({
            status: [null],
            address: [null]
        })
    }

    public submit(): void {
        this.search.emit(this.formGroup.value);
    }
}