import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { STATUS } from "src/app/base/_helpers/constant";
import { StatusModel } from "src/app/base/core/models/status.model.ts";
import { FormSearchProductModel } from "../../models/form-search-product.model";

@Component({
    selector: 'app-form-search-product',
    templateUrl: './form-search.component.html',
    styleUrls: ['./form-search.component.scss']
})
export class FormSearchComponent implements OnInit {

    @Output() search: EventEmitter<FormSearchProductModel> = new EventEmitter();

    formGroup: FormGroup;
    statusList: StatusModel[] = STATUS;

    constructor(
        private fb: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.submit();
    }

    initForm(): void {
        this.formGroup = this.fb.group({
            codeName: [null],
            status: [null]
        })
    }

    submit(): void {
        this.search.emit(this.formGroup.value)
    }
}