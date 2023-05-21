import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { lastValueFrom } from 'rxjs';
import { recursive } from "src/app/base/_helpers/helper";
import { ResourceService } from "src/app/base/core/services/resource.service";
import { SpinnerService } from "src/app/base/core/services/spinner.service";
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styles: [`
        .button-upload-image {
            width: 100px;
            height: 100px;
            background: url(../../../../../assets/image/uploadpng.png);
            background-repeat: no-repeat;
            background-size: 100px 100px;
            border-radius: 4px;
            opacity: .5;
        }
    `]
})
export class CreateUserComponent {
    public formGroup: FormGroup;
    public file: File;

    constructor(
        private fb: FormBuilder,
        private spinnerService: SpinnerService,
        private toastrService: ToastrService,
        private userService: UserService,
        private matDialogRef: MatDialogRef<CreateUserComponent>,
        private resourceService: ResourceService,
    ) { }

    public ngOnInit(): void {
        this.initForm();
    }

    private initForm(): void {
        this.formGroup = this.fb.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]],
            fullName: [null, [Validators.required]],
            phone: [null, [Validators.required]],
            gender: ['MALE'],
            dob: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.maxLength(255)]],
            avatar: [null],
            address: [null,[Validators.required]],
            authority: ['MANAGER'],
        });
    }

    public async submit(): Promise<void> {
        recursive(this.formGroup);
        const { invalid } = this.formGroup;
        if (invalid) return;
        const value = this.formGroup.getRawValue();
        if (!this.file && !value.id) {
            this.toastrService.error('Chon 1 ảnh');
            return;
        }
        this.spinnerService.isLoading(true);
        const response = await lastValueFrom(this.resourceService.updateUserImage(this.file, value.username));
        value.avatar = response.url;
        await lastValueFrom(this.userService.createAdminUser(value));

        this.toastrService.success('Thêm quản lý thành công');
        this.spinnerService.isLoading(false);
        this.matDialogRef.close({action: 'save'});
    }

    get getControl() {
        return this.formGroup.controls;
    }
}