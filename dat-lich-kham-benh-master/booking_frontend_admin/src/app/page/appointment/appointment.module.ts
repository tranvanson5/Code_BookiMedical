import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { NgSelectModule } from "@ng-select/ng-select";
import { AgGridModule } from "ag-grid-angular";
import { CoreModule } from "src/app/base/core/core.module";
import { CategoryRoutingModule } from "./appointment-routing.module";
import { AppointmentContainer } from "./appointment.container";
import { FormSearchAppointmentComponent } from "./components/form-search-appointment/form-search-appointment.component";
import { AppointmentActionComponent } from "./components/appointment-action/appointment-action.component";
import { AppointmentDetailComponent } from "./components/appointment-detail/appointment-detail.component";
import { ConfirmApproveComponent } from "./components/confirm-approve/popup-confirm.component";

const imports = [
    CommonModule,
    NgSelectModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.forRoot([]),

    CoreModule,
    CategoryRoutingModule,
];
const declarations = [
    AppointmentContainer,
    FormSearchAppointmentComponent,
    AppointmentActionComponent,
    AppointmentDetailComponent,
    ConfirmApproveComponent
];

@NgModule({
    imports: imports,
    declarations: declarations
})
export class AppointmentModule {}