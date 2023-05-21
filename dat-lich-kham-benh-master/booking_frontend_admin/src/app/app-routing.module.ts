import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Authority } from "./base/core/models/menu.model";
import { LayoutComponent } from "./layout/layout.component";

const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },

    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'product',
                loadChildren: () => import('./page/product/product.module').then(m => m.ProductModule),
                data: {
                    authority: [Authority.ADMIN ]
                }
            },
            {
                path: 'user',
                loadChildren: () => import('./page/user/user.module').then(m => m.UserModule),
                data: {
                    authority: [Authority.ADMIN]
                }
            },
            {
                path: 'bill',
                loadChildren: () => import('./page/bill/bill.module').then(m => m.BillModule),
                data: {
                    authority: [Authority.ADMIN]
                }
            },
            {
                path: 'statistic',
                loadChildren: () => import('./page/statistic/statistic.module').then(m => m.StatisticModule),
            },
            {
                path: 'department',
                loadChildren: () => import('./page/department/department.module').then(m => m.DepartmentModule),
                data: {
                    authority: [Authority.ADMIN]
                }
            },
            {
                path: 'specialist',
                loadChildren: () => import('./page/specialist/specialist.module').then(m => m.SpecialistModule),
                data: {
                    authority: [Authority.ADMIN]
                }
            },
            {
                path: 'appointment',
                loadChildren: () => import('./page/appointment/appointment.module').then(m => m.AppointmentModule),
                data: {
                    authority: [Authority.ADMIN, Authority.MANAGER]
                }
            },
            {
                path: 'scanner-appointment',
                loadChildren: () => import('./page/scanner-appointment/scanner-appointmentn.module').then(m => m.ScannerAppointmentModule),
                data: {
                    authority: [Authority.MANAGER]
                }
            }
        ]
    },
    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}