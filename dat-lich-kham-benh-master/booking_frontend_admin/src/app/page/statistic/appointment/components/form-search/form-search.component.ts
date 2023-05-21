import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { DepartmentService } from 'src/app/page/department/services/department.service';
import { Observable, tap } from 'rxjs';
import { Department } from 'src/app/page/department/models/department.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Authority } from 'src/app/base/core/models/menu.model';

@Component({
    selector: 'app-form-search-statistic',
    templateUrl: './form-search.component.html',
    styleUrls: ['./form-search.component.scss']
})
export class FormSearchStatistic implements OnInit {

    @Output() search: EventEmitter<{}> = new EventEmitter();

    formGroup: FormGroup;
    now: Date = new Date();
    department$: Observable<Department[]>;
    isAdmin: boolean = false;
    constructor(
        private fb: FormBuilder,
        private departmentService: DepartmentService,
        private authService: AuthService
    ) {}
    public ngOnInit(): void {
        this.formGroup = this.fb.group({
            year: [this.now.getFullYear()],
            departmentId: [null],
        })
        this.isAdmin = this.authService.isAuthorization([Authority.ADMIN]);
        if (this.isAdmin) {
            this.department$ = this.departmentService.getDepartment();
            this.search.emit(this.formGroup.value);
        } else {
            this.department$ = this.departmentService.getMyDepartment()
                .pipe(
                    tap(res => {
                        this.formGroup.get('departmentId').setValue(res[0].code);
                        this.search.emit(this.formGroup.value);
                    })
                );
        }
    }
}