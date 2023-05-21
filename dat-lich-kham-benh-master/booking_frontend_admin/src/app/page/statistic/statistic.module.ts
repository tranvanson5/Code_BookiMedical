import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Authority } from "src/app/base/core/models/menu.model";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: '',
            children: [
                {
                    path: 'revenue',
                    loadChildren: () => import('./revenue/statistic-revenue.module').then(m => m.StatisticRevenueModule),
                    data: {
                        authority: [ Authority.ADMIN]
                    }
                },
                {
                    path: 'user',
                    loadChildren: () => import('./user/statistic-user.module').then(m => m.StatisticUserModule),
                    data: {
                        authority: [ Authority.ADMIN]
                    }
                },
                {
                    path: 'appointment',
                    loadChildren: () => import('./appointment/statistic-appointment.module').then(m => m.StatisticAppointmentModule),
                    data: {
                        authority: [ Authority.ADMIN,  Authority.MANAGER]
                    }
                }
            ]
        }])
    ],
    exports: [RouterModule]
})
export class StatisticModule {}