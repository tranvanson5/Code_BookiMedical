import { BASE_STYLE, DEFAULT_PAGE_SIZE } from "src/app/base/_helpers/constant";
import { StatusComponent } from "src/app/base/core/components/cells/status/status.component";
import { ActionComponent } from "../components/action/action.component";

export const USER_COLUMN = [
    {
        headerName: 'STT',
        headerTooltip: 'STT',

        minWidth: 60,
        maxWidth: 60,

        cellStyle: BASE_STYLE,

        valueGetter: params => {
            const context = params.context;
            return params.node.rowIndex + 1 + (DEFAULT_PAGE_SIZE * (context.pagination.currentPage - 1));
        }
    },

    {
        headerName: 'Tên đăng nhập',
        headerTooltip: 'Tên đăng nhập',

        field: 'username',
        tooltipField: 'username',
        cellStyle: BASE_STYLE,

        minWidth: 100,
        maxWidth: 150,
    },

    {
        headerName: 'Họ và tên',
        headerTooltip: 'Họ và tên',

        field: 'fullName',
        tooltipField: 'fullName',

        cellStyle: BASE_STYLE,

        minWidth: 100,
    },

    {
        headerName: 'Ngày sinh',
        headerTooltip: 'Ngày sinh',

        field: 'dob',
        tooltipField: 'dob',
        
        cellStyle: BASE_STYLE,

        minWidth: 100,
        maxWidth: 130,
    },

    {
        headerName: 'Số điện thoại',
        headerTooltip: 'Số điện thoại',

        field: 'phone',
        tooltipField: 'phone',
        
        cellStyle: BASE_STYLE,

        minWidth: 100,
        maxWidth: 130,
    },

    {
        headerName: 'Email',
        headerTooltip: 'Email',

        field: 'email',
        tooltipField: 'email',
        
        cellStyle: BASE_STYLE,

        minWidth: 100,
        maxWidth: 130,
    },

    {
        headerName: 'Địa chỉ',
        headerTooltip: 'Địa chỉ',

        field: 'address',
        tooltipField: 'address',
        
        cellStyle: BASE_STYLE,

        minWidth: 100,
        maxWidth: 130,
    },


    {
        headerName: 'Vai trò',
        headerTooltip: 'Vai trò',

        valueGetter: param => {
            return param.data.authorities
                ?.map(x => x.code)
                .join(', ')
        },

        tooltipValueGetter: param => {
            return param.data.authorities
                ?.map(x => x.code)
                .join(', ')
        },
        
        cellStyle: BASE_STYLE,

        minWidth: 100,
        maxWidth: 130,
    },

    {
        headerName: 'Trạng thái',
        headerTooltip: 'Trạng thái',

        minWidth: 100,

        cellRenderer: StatusComponent,
        values: ['Không hoạt động', 'Hoạt động'],
        backgrounds: ['#FFEDE4', '#F4FEFF'],
        colors: ['#DF642A', '#00A3AE'],

        cellStyle: BASE_STYLE
    },

    {
        cellRenderer: ActionComponent,
        minWidth: 48,
        maxWidth: 48,
        cellStyle: {
            'overflow': 'unset',
            'padding-top': '10px',
        }
    }
]