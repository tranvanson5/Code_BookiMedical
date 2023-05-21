import { Gender } from "../../appointment/models/appointment-creation.model";

export interface Account {
    id: number;
    dob: string;
    username: string;
    fullName: string;
    phone: string;
    address: string;
    email: string;
    active: boolean;
    gender: Gender;
    avatar: string;
}