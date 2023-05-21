import { ResponseServiceModel } from "src/app/base/core/models/search.model";

export interface AppointmentRequest {
    fullName: string;
    time: string;
    status: string;
    departmentIds: string[];
}

export interface AppointmentResponse {
    id: string;
    fullName: string;
    gender: string;
    age: number;
    phone: number;
    time: string;
    departmentName: string;
    specialistName: string;
    status: string;
    address: string;
    reasonOfPatient: string;
    reasonOfManager: string;
    cancelDate: Date;
    approvedDate: Date;
    doneDate: Date;
}

export interface ResponseSearchAppointment extends ResponseServiceModel<AppointmentResponse> {

}

export interface OverallAppointment {
    cancel: number;
    pending: number;
    done: number;
    approved: number;
}