import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Observable, Subject } from 'rxjs';
import { Department } from 'src/app/module/department/models/department.model';
import { DepartmentService } from 'src/app/module/department/services/department.service';
import { takeUntil, tap } from 'rxjs/operators';
import { InputDateComponent, InputDatetimeComponent } from 'src/app/module/shared';
import { SpinnerService } from 'src/app/module/shared/spinner/services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from '../../services/appointment.service';
import { Utils } from 'src/app/core/utils/Utils';
import { Specialist } from 'src/app/module/specialist/models/specialist.model';
import { SpecialistService } from 'src/app/module/specialist/services/specialist.service';

@Component({
    selector: 'app-appointment-form',
    templateUrl: './appointment-form.component.html',
    styleUrls: ['./appointment-form.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgSelectModule,

        InputDateComponent,
        InputDatetimeComponent,
    ],
    providers: [
        DepartmentService,
    ]
})
export class AppointmentFormComponent implements OnInit, OnDestroy {

    // unsubscribe
    private readonly onDestroy$: Subject<void> = new Subject();

    // transfer data
    public formGroup: FormGroup;
    public departmentList$: Observable<Department[]>;
    public specialist$: Observable<Specialist[]>;

    // inject
    private readonly fb: FormBuilder = inject(FormBuilder);
    private readonly departmentService = inject(DepartmentService);
    private readonly spinnerService = inject(SpinnerService);
    private readonly toastService = inject(ToastrService);
    private readonly appointmentService = inject(AppointmentService);
    private readonly specialistService = inject(SpecialistService);

    public get formControl() {
        return this.formGroup.controls;
    }

    public ngOnInit(): void {
        this.ngOnBuildForm();
        this.ngOnLoadDepartment();
        this.ngOnLoadSpecialist();
    }

    private ngOnBuildForm(): void {
        this.formGroup = this.fb.group({
            fullName: [null, [Validators.required]],
            address: [null, [Validators.required]],
            age: [null, [Validators.required, Validators.min(1)]],
            phone: [null, [Validators.required, Validators.pattern('^(0|\\+84)[0-9]{9}')]],
            gender: ['MALE'],
            time: [null, [Validators.required]],
            description: [null],
            departmentId: [null],
            specialistId: [null]
        });
    }

    private ngOnLoadDepartment(): void {
        this.departmentList$ = this.departmentService.getActiveDepartment()
        .pipe(
            tap(res => {
                this.formGroup.get('departmentId')?.setValue(res[0].code);
            })
        );
    }

    private ngOnLoadSpecialist(): void {
        this.specialist$ = this.specialistService.findActiveSpecialist()
            .pipe(
                tap(res => {
                    this.formControl.specialistId.setValue(res[0].id);
                })
            )
    }

    public ngOnSubmitForm(): void {
        Utils.beforeSubmitFormGroup(this.formGroup);
        if (this.formGroup.invalid) {
            this.toastService.error('Có lỗi xảy ra!');
            return;
        }
        const value = this.formGroup.value;
        this.spinnerService.showLoading();
        this.appointmentService.createAppointment(value)
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(res => {
                this.spinnerService.hideLoading();
                this.toastService.success('Đặt lịch hẹn thành công.');
            });
    }

    public ngOnDestroy(): void {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }
}