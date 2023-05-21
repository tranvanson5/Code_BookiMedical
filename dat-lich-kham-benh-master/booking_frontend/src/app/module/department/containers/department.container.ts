import { DepartmentService } from './../services/department.service';
import { AsyncPipe, DatePipe, NgFor, NgIf } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Department } from "../models/department.model";

@Component({
    selector: 'app-department-container',
    templateUrl: './department.container.html',
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        AsyncPipe,
        DatePipe
    ]
})
export class DepartmentContainer implements OnInit {

    public departments$: Observable<Department[]>;

    private readonly departmentService = inject(DepartmentService);


    public ngOnInit(): void {
        this.departments$ = this.departmentService.getActiveDepartment();
    }
}