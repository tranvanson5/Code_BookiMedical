import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { StatisticAppointmentContainer } from "./statistic-appointment.container";
import { AuthGuard } from "src/app/base/core/guard/auth.guard";
import { AuthorizateGuard } from "src/app/base/core/guard/authorizate.guard";

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
            component: StatisticAppointmentContainer,
            canActivate: [AuthGuard, AuthorizateGuard],
        }
    ])],
    exports: [RouterModule]
})
export class StatisticAppointmentRoutingModule {}