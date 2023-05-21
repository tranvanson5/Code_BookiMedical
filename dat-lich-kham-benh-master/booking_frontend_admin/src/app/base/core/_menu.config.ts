import { Authority, MenuModel } from "./models/menu.model";

export const Menu: MenuModel[] = [
    {

        name: 'Thống kê',
        isExpanded: false,
        icon: 'fas fa-chart-line',
        authority: [Authority.ADMIN, Authority.MANAGER],
        children: [
            {
                name: 'Doanh thu',
                page: 'statistic/revenue',
                authority: [Authority.ADMIN]
            },
            {
                name: 'Lịch hẹn',
                page: 'statistic/appointment',
                authority: [Authority.ADMIN, Authority.MANAGER]
            },
            {
                name: 'Tài khoản',
                page: 'statistic/user',
                authority: [Authority.ADMIN]
            },
        ]
    },

    {
        name: 'Quản lý chi nhánh',
        page: 'department',
        icon: 'fas fa-building',
        authority: [Authority.ADMIN]
    },

    {
        name: 'Quản lý chuyên khoa',
        page: 'specialist',
        icon: 'fas fa-universal-access',
        authority: [Authority.ADMIN]
    },

    {
        name: 'Quản lý lịch hẹn',
        page: 'appointment',
        icon: 'fab fa-watchman-monitoring',
        authority: [Authority.ADMIN, Authority.MANAGER]
    },

    {
        name: 'Quản lý tài khoản',
        page: 'user',
        icon: 'fas fa-users',
        authority: [Authority.ADMIN]
    },

    {
        name: 'Quản lý gói dịch vụ',
        page: 'product',
        icon: 'fab fa-product-hunt',
        authority: [Authority.ADMIN]
    },

    {
        name: 'Quản lý đơn hàng',
        page: 'bill',
        icon: 'fas fa-file-invoice',
        authority: [Authority.ADMIN]
    },
    {
        name: 'Quét mã gói dịch vụ',
        page: 'bill',
        icon: 'fas fa-qrcode',
        authority: [Authority.MANAGER]
    },
    {
        name: 'Quét mã lịch hẹn',
        page: 'scanner-appointment',
        icon: 'fas fa-qrcode',
        authority: [Authority.MANAGER]
    },
]