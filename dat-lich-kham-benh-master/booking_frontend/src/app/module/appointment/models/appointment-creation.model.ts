export interface AppointmentCreationRequest {
    fullName: string;
    address: string;
    age: number;
    phone: string;
    gender: Gender;
    time: string;
    description: string;
    departmentId: string;
    specialistId: number;
}

export interface AppointmentCreationResponse {
    id: string;
    fullName: string;
    address: string;
    age: number;
    phone: string;
    gender: string;
    time: string;
    description: string;
    status: string;
}

export enum Gender {
    MALE, FEMALE
}