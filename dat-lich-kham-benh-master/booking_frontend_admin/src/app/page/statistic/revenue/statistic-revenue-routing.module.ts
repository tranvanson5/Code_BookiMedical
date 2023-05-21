import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { StatisticRevenueContainer } from "./statistic-revenue.container";
import { AuthGuard } from "src/app/base/core/guard/auth.guard";
import { AuthorizateGuard } from "src/app/base/core/guard/authorizate.guard";

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
            component: StatisticRevenueContainer,
            canActivate: [AuthGuard, AuthorizateGuard],
        }
    ])],
    exports: [RouterModule]
})
export class StatisticRevenueRoutingModule {}