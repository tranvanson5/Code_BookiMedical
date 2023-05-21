import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { StatisticUserContainer } from "./statistic-user.container";
import { AuthGuard } from "src/app/base/core/guard/auth.guard";
import { AuthorizateGuard } from "src/app/base/core/guard/authorizate.guard";

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
            component: StatisticUserContainer,
            canActivate: [AuthGuard, AuthorizateGuard],
        }
    ])],
    exports: [RouterModule]
})
export class StatisticUserRoutingModule {}