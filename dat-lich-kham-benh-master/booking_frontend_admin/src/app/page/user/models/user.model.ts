import { ResponseServiceModel } from "src/app/base/core/models/search.model";

export interface UserModel {
    id: number;
    username: string;
    fullName: string;
    dob: string;
    status: number;
    phone: string;
    address: string;
    email: string;
    avatar: string;
}

export interface RoleModel {
    id?: number;
    name: string;
}

export interface ResponseSearchUser extends ResponseServiceModel<UserModel> {
    
}

export interface OverallUser {
    total: number;
    active: number;
    inactive: number;
}

export interface HisChangeStatus {
    username: string;
    oldStatus: boolean;
    newStatus: boolean;
    updateDate: string;
    updater: string;
}