import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgGridModule } from 'ag-grid-angular';
import { CoreModule } from 'src/app/base/core/core.module';
import { ActionComponent } from './components/action/action.component';
import { FormSearchSpecialistComponent } from './components/form-search/form-search.component';
import { CreateUpdateSpecialistComponent } from './components/create-update-specialist/create-update-specialist.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SpecialistContainer } from './specialist.container';
import { AuthGuard } from 'src/app/base/core/guard/auth.guard';
import { AuthorizateGuard } from 'src/app/base/core/guard/authorizate.guard';

const routes: Routes = [
    {
        path: '',
        component: SpecialistContainer,
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

    CoreModule,
];
const declarations = [
    SpecialistContainer,
    FormSearchSpecialistComponent,
    ActionComponent,
    CreateUpdateSpecialistComponent
];

@NgModule({
    imports: imports,
    declarations: declarations,
})
export class SpecialistModule {}