import { Account } from './../../account/models/account.model';
export interface Feedback {
    creator: Account;
    content: string;
}