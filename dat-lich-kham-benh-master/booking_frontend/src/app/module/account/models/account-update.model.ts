import { Gender } from "../../appointment/models/appointment-creation.model";

export interface AccountUpdateReq {
    dob: string;
    address: string;
    phone: string;
    email: string;
    gender: Gender
    fullName: string;
    avatar: string;
}