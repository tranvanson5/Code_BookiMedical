import { StatusModel } from "../core/models/status.model.ts";

export const DEFAULT_PAGE_SIZE = 10;
export const DOT_DOT_DOT: string = '...';

export const BASE_STYLE = {
    'white-space': 'nowrap',
    'text-overflow': 'ellipse',
    'overflow': 'hidden',
    'font-weight': '500',
    'font-size': '12px',
    'font-family': 'Inter',
    'font-style': 'normal',
    'color': 'rgb(16, 24, 64)',
    'padding-top': '10px',
}

export const BASE_STYLE_CENTER = {
    ...BASE_STYLE,
    'text-align': 'center',
}

export const STATUS: StatusModel[] = [
    {
        id: 0,
        label: 'Không hoạt động'
    },

    {
        id: 1,
        label: 'Hoạt động'
    }
]

export const APPOINTMENT_STATUS = [
    {
        code: 'PENDING',
        name: 'Chờ duyệt',
    },
    {
        code: 'APPROVED',
        name: 'Đã duyệt',
    },
    {
        code: 'DONE',
        name: 'Hoàn thành',
    },
    {
        code: 'CANCEL',
        name: 'Hủy bỏ',
    }
]

export const ACTION_CLOSE = '_CLOSE';
export const ACTION_ACCEPT = '_ACCEPT';
export const ACTIVE = 1;
export const INACTIVE = 0;