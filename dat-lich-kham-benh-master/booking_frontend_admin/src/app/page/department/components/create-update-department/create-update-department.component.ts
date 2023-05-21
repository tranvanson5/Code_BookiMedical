import { Observable } from 'rxjs';
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { STATUS } from "src/app/base/_helpers/constant";
import { recursive } from "src/app/base/_helpers/helper";
import { StatusModel } from "src/app/base/core/models/status.model.ts";
import { Department } from "../../models/department.model";
import { UserModel } from 'src/app/page/user/models/user.model';
import { UserService } from 'src/app/page/user/services/user.service';
import { DepartmentService } from '../../services/department.service';
import { SpinnerService } from 'src/app/base/core/services/spinner.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-create-update-department',
    templateUrl: './create-update-department.component.html',
    styleUrls: ['./create-update-department.component.scss']
})
export class CreateUpdateDepartmentComponent implements OnInit {

    public formGroup: FormGroup;
    public status: StatusModel[] = STATUS;
    public managers$: Observable<UserModel[]>

    constructor(
        private spinnerService: SpinnerService,
        private toastrService: ToastrService,
        private departmentService: DepartmentService,
        private userService: UserService,
        private fb: FormBuilder,
        private matDialogRef: MatDialogRef<CreateUpdateDepartmentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Department,
    ) {}

    public ngOnInit(): void {
        this.managers$ = this.userService.getManagers();
        this.initForm();
        this.initData();
    }

    private initForm() {
        this.formGroup = this.fb.group({
            code: [null, [Validators.required]],
            address: [null, [Validators.required]],
            status: [1, [Validators.required]],
            openTime: [null, [Validators.required]],
            closeTime: [null, [Validators.required]],
            manager: [null, [Validators.required]],
            telephone: [null, [Validators.required, Validators.pattern('^(0|\\+84)[0-9]{9}')]]
        })
    }

    private initData(): void {
        if (!this.data) {
            return;
        } 
        this.formGroup.get('code').disable();
        const data = {
            ...this.data,
            manager: this.data.manager.id
        }
        this.formGroup.patchValue(data);
    }

    public onClose(event): void {
        this.matDialogRef.close(event);
    }

    public submit(): void {
        recursive(this.formGroup);
        if (this.formGroup.invalid) return;
        this.spinnerService.isLoading(true);
        if (this.data) {
            this.departmentService.updateDepartment(this.formGroup.getRawValue())
            .subscribe(res => {
                this.spinnerService.isLoading(false);
                this.toastrService.success('Cập nhật thành công');
                this.onClose('OK');
            })
            return
        }
        this.departmentService.saveDepartment(this.formGroup.value)
            .subscribe(res => {
                this.spinnerService.isLoading(false);
                this.toastrService.success('Thêm mới thành công');
                this.onClose('OK');
            })
    }

    public get getControl() {
        return this.formGroup.controls;
    }
}