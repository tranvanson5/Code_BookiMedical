import { Account } from "src/app/module/account/models/account.model";

export interface JwtRequest {
    username: string;
    password: string;
}

export interface JwtResponse {
    jwt: string;
    user: Account;
}