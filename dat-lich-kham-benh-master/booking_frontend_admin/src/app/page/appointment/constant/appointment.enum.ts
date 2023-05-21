export enum AppointmentStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    DONE = 'DONE',
    CANCEL = 'CANCEL',
}

export const AppointmentStatusMap = {
    PENDING: {
        name: 'Chờ duyệt',
        color: '#ffc107'
    },
    APPROVED: {
        name: 'Đã duyệt',
        color: '#0d6efd'
    },
    DONE: {
        name: 'Hoàn thành',
        color: '#198754'
    },
    CANCEL: {
        name: 'Hủy bỏ',
        color: '#dc3545'
    }
}