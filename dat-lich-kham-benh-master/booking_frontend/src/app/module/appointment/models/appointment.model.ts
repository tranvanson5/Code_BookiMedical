import { AppointmentStatus } from "../constant/appointment-status.enum";
import { Gender } from "./appointment-creation.model";

export interface Appointment {
    id: string;
    fullName: string;
    gender: Gender;
    age: number;
    phone: number;
    time: string;
    departmentName: string;
    specialistName: string;
    status: AppointmentStatus;
    address: string;
    reasonOfPatient: string;
    reasonOfManager: string;
    cancelDate: Date;
    approvedDate: Date;
    doneDate: Date;
}