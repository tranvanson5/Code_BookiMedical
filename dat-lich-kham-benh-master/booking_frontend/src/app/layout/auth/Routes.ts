import { Routes } from "@angular/router";
import { AuthLayout } from "./auth.layout";

export const routes: Routes = [
    {
        path: '',
        component: AuthLayout,
        children: [
            {
                path: 'login',
                title: 'Đăng nhập | Đặt lịch khám bệnh',
                loadComponent: () => import('../../page').then(page => page.SignInPage)
            },
            {
                path: 'register',
                title: 'Đăng ký | Đặt lịch khám bệnh',
                loadComponent: () => import('../../page').then(page => page.SignupPage)
            },
            {
                path: 'forgot-password',
                title: 'Quên mật khẩu | Đặt lịch khám bệnh',
                loadComponent: () => import('../../page').then(page => page.ForgotPasswordPage)
            }
        ]
    }
]