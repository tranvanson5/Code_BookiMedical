import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { NgSelectModule } from "@ng-select/ng-select";
import { AgGridModule } from "ag-grid-angular";
import { CoreModule } from "src/app/base/core/core.module";
import { FormSearchUserComponent } from "./components/form-search-user/form-search-user.component";
import { UserRoutingModule } from "./user-routing.module";
import { UserContainer } from "./user.container";
import { ActionComponent } from "./components/action/action.component";
import { CommonModule } from "@angular/common";
import { CreateUserComponent } from "./components/create/create-user.component";

const imports = [
    CoreModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    AgGridModule.forRoot([]),
    MatDialogModule,

    UserRoutingModule,
];

const declarations = [
    UserContainer,
    FormSearchUserComponent,
    ActionComponent,
    CreateUserComponent
]

@NgModule({
    imports: imports,
    declarations: declarations,
})
export class UserModule {}