import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { APPOINTMENT_STATUS } from "src/app/base/_helpers/constant";
import { AppointmentRequest } from "../../models/appointment.model";
import { DepartmentService } from "src/app/page/department/services/department.service";
import { Observable, tap } from "rxjs";
import { Department } from "src/app/page/department/models/department.model";
import { AuthService } from "src/app/auth/services/auth.service";
import { Authority } from "src/app/base/core/models/menu.model";

@Component({
    selector: 'app-form-search-appointment',
    templateUrl: './form-search-appointment.component.html',
    styleUrls: ['./form-search-appointment.component.scss']
})
export class FormSearchAppointmentComponent implements OnInit {

    @Output() public search: EventEmitter<AppointmentRequest> = new EventEmitter();
    public formGroup: FormGroup;
    public _status = APPOINTMENT_STATUS;
    public department$: Observable<Department[]>;
    public isAdmin: boolean = false;

    constructor(
        private fb: FormBuilder,
        private departmentService: DepartmentService,
        private authService: AuthService,
    ) {}

    public ngOnInit(): void {
        this.initForm();
        this.isAdmin = this.authService.isAuthorization([Authority.ADMIN]);
        if (this.isAdmin) {
            this.department$ = this.departmentService.getDepartment();
            this.submit();
        } else {
            this.department$ = this.departmentService.getMyDepartment()
                .pipe(
                    tap(res => {
                        this.formGroup.get('departmentIds').setValue([res[0].code]);
                        this.submit();
                    })
                );
        }
    }

    public initForm(): void {
        this.formGroup = this.fb.group({
            fullName: [null],
            status: [null],
            time: [null],
            departmentIds: [null]
        })
    }

    public submit(): void {
        this.search.emit(this.formGroup.value);
    }
}