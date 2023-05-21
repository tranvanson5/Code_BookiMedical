import { Account } from "../../account/models/account.model";

export interface Department {
    code: string;
    address: string;
    openTime: string;
    closeTime: string;
    telephone: string;
    manager: Account;
}