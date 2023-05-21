import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import * as ClassicEditor from 'src/assets/customCkeditor';
import { ToastrService } from "ngx-toastr";
import { Subject, lastValueFrom } from "rxjs";
import { StatusModel } from "src/app/base/core/models/status.model.ts";
import { STATUS } from "src/app/base/_helpers/constant";
import { recursive } from "src/app/base/_helpers/helper";
import { ProductModel } from "../../models/product.model";
import { ProductService } from "../../services/product.service";
import { ResourceService } from "src/app/base/core/services/resource.service";
import { SpinnerService } from "src/app/base/core/services/spinner.service";

@Component({
    selector: 'app-create-update-product',
    templateUrl: './create-update-product.component.html',
    styleUrls: ['./create-update-product.component.scss']
})
export class CreateUpdateProductComponent implements OnInit, OnDestroy {

    private unsubscribe$: Subject<void> = new Subject();

    public status: StatusModel[] = STATUS;
    public formGroup: FormGroup;
    public _editor = ClassicEditor;
    public file: File;

    constructor(
        private fb: FormBuilder,
        private spinnerService: SpinnerService,
        private toastrService: ToastrService,
        private productService: ProductService,
        private matDialogRef: MatDialogRef<CreateUpdateProductComponent>,
        private resourceService: ResourceService,
        @Inject(MAT_DIALOG_DATA) public data,
    ) { }

    public ngOnInit(): void {
        this.initForm();
        this.data && this.initData(this.data);
    }

    private initForm(): void {
        this.formGroup = this.fb.group({
            id: [null],
            code: [null, [Validators.required]],
            name: [null, [Validators.required]],
            price: [null, [Validators.required]],
            status: [0],
            fullDescription: [null, [Validators.required]],
            shortDescription: [null, [Validators.required, Validators.maxLength(255)]],
            avatar: [null],
        });
    }

    public initData(product: ProductModel): void {
        this.formGroup.get('code').disable();
        this.formGroup.patchValue(product);
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
        if (!value.id || this.file) {
            const response = await lastValueFrom(this.resourceService.uploadProductImage(this.file, value.code));
            value.avatar = response.url;
        }

        if (value.id) {
            await lastValueFrom(this.productService.updateProduct(value));
            this.toastrService.success('Cập nhật sản phẩm thành công');
            
        } else {
            await lastValueFrom(this.productService.createProduct(value));
            this.toastrService.success('Thêm sản phẩm thành công')
        }
        this.spinnerService.isLoading(false);
        this.matDialogRef.close({action: 'save'});
    }

    get getControl() {
        return this.formGroup.controls;
    }

    public ngOnDestroy(): void {
        this.unsubscribe$ && this.unsubscribe$.unsubscribe();
    }

}