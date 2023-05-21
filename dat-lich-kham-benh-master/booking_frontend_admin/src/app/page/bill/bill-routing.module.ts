import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BillContainer } from "./bill.container";
import { AuthGuard } from "src/app/base/core/guard/auth.guard";
import { AuthorizateGuard } from "src/app/base/core/guard/authorizate.guard";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: '',
            component: BillContainer,
            canActivate: [AuthGuard, AuthorizateGuard],
        }])
    ],
    exports: [RouterModule]
})
export class BillRoutingModule {}