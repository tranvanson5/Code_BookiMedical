import { ConfirmOtpReq } from "./confirm-otp";

export interface ChangePasswordReq extends ConfirmOtpReq {
    newPassword: string;
}