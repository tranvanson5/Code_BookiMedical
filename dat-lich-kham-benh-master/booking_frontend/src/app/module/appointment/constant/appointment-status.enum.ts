export enum AppointmentStatus {
    PENDING = 'PENDING', 
    APPROVED = 'APPROVED', 
    CANCEL = 'CANCEL', 
    DONE = 'DONE',
}

export const AppointmentStatusMap = {
    PENDING: 'Chờ duyệt',
    APPROVED: 'Đã duyệt',
    CANCEL: 'Hủy bỏ',
    DONE: 'Hoàn thành',
}