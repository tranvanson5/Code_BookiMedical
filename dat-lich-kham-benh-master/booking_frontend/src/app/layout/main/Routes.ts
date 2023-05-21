import { Routes } from '@angular/router';
import { MainLayout } from './main.layout';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [
            {
                path: 'home',
                title: 'Trang chủ | Đặt Lịch khám bệnh',
                loadComponent: () =>
                    import('../../page').then(page => page.HomePage)
            },
            {
                path: 'about',
                title: 'Về chúng tôi | Đặt Lịch khám bệnh',
                loadComponent: () =>
                    import('../../page').then(page => page.AboutPage)
            },
            {
                path: 'service',
                title: 'Gói dịch vụ | Đặt Lịch khám bệnh',
                loadComponent: () =>
                    import('../../page').then(page => page.ServicePage)
            },
            {
                path: 'contact',
                title: 'Liên hệ với chúng tôi | Đặt Lịch khám bệnh',
                loadComponent: () =>
                    import('../../page').then(page => page.ContactPage)
            },
            {
                path: 'my-appointment',
                title: 'Lịch hẹn của tôi | Đặt Lịch khám bệnh',
                canActivate: [AuthGuard],
                loadComponent: () =>
                    import('../../page').then(page => page.MyAppointmentPage)
            },
            {
                path: 'profile',
                title: 'Hồ sơ | Đặt Lịch khám bệnh',
                canActivate: [AuthGuard],
                loadComponent: () =>
                    import('../../page').then(page => page.ProfilePage)
            },
            {
                path: 'cart',
                title: 'Giỏ hàng | Đặt lịch khám bệnh',
                canActivate: [AuthGuard],
                loadComponent: () =>
                    import('../../page').then(page => page.CartPage)
            },
            {
                path: 'my-product',
                title: 'Sản phẩm của tôi | Đặt lịch khám bệnh',
                canActivate: [AuthGuard],
                loadComponent: () =>
                    import('../../page').then(page => page.MyProductPage)
            },
            {
                path: 'my-bill',
                title: 'Lịch sử mua hàng | Đặt lịch khám bệnh',
                canActivate: [AuthGuard],
                loadComponent: () =>
                    import('../../page').then(page => page.MyBillPage)
            }
        ]
    }
]
