import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgGridModule } from 'ag-grid-angular';
import { CoreModule } from 'src/app/base/core/core.module';
import { ActionComponent } from './components/action/action.component';
import { FormSearchDepartmentComponent } from './components/form-search/form-search.component';
import { DepartmentContainer } from './department.container';
import { CreateUpdateDepartmentComponent } from './components/create-update-department/create-update-department.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { AuthorizateGuard } from 'src/app/base/core/guard/authorizate.guard';
import { AuthGuard } from 'src/app/base/core/guard/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: DepartmentContainer,
        canActivate: [AuthGuard, AuthorizateGuard],
    }
]

const imports = [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    AgGridModule.forRoot([]),
    NgSelectModule,
    MatDialogModule,
    NgxMatTimepickerModule,

    CoreModule,
];
const declarations = [
    DepartmentContainer,
    FormSearchDepartmentComponent,
    ActionComponent,
    CreateUpdateDepartmentComponent
];

@NgModule({
    imports: imports,
    declarations: declarations,
})
export class DepartmentModule {}