import { ForgotPasswordReq } from "./forgot-password";

export interface ConfirmOtpReq extends ForgotPasswordReq {
    otp: string;
}