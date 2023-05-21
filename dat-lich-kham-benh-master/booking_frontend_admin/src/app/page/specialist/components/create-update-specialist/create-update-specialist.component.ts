import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from 'ngx-toastr';
import { STATUS } from "src/app/base/_helpers/constant";
import { recursive } from "src/app/base/_helpers/helper";
import { StatusModel } from "src/app/base/core/models/status.model.ts";
import { SpinnerService } from 'src/app/base/core/services/spinner.service';
import { SpecialistService } from '../../services/specialist.service';
import { Specialist } from "../../models/specialist.model";

@Component({
    selector: 'app-create-update-specialist',
    templateUrl: './create-update-specialist.component.html',
    styleUrls: ['./create-update-specialist.component.scss']
})
export class CreateUpdateSpecialistComponent implements OnInit {

    public formGroup: FormGroup;
    public status: StatusModel[] = STATUS;

    public get getControl() {
        return this.formGroup.controls;
    }

    constructor(
        private spinnerService: SpinnerService,
        private toastrService: ToastrService,
        private specialistService: SpecialistService,
        private fb: FormBuilder,
        private matDialogRef: MatDialogRef<CreateUpdateSpecialistComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Specialist,
    ) {}

    public ngOnInit(): void {
        this.initForm();
        this.initData();
    }

    private initForm() {
        this.formGroup = this.fb.group({
            id: [null],
            name: [null, [Validators.required]],
            status: [1, [Validators.required]],
        })
    }

    private initData(): void {
        if (!this.data) {
            return;
        } 
        this.formGroup.patchValue(this.data);
    }

    public onClose(event): void {
        this.matDialogRef.close(event);
    }

    public submit(): void {
        recursive(this.formGroup);
        if (this.formGroup.invalid) return;
        this.spinnerService.isLoading(true);
        this.specialistService.saveSpecialist(this.formGroup.value)
        .subscribe(res => {
            this.spinnerService.isLoading(false);
            if (this.data) {
                this.toastrService.success('Cập nhật thành công');
            } else {
                this.toastrService.success('Thêm mới thành công');
            }
            this.onClose('OK');
        })
    }
}