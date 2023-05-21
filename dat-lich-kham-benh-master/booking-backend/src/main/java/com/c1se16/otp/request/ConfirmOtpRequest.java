package com.c1se16.otp.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ConfirmOtpRequest extends ForgotPasswordRequest {

    @NotBlank
    private String otp;
}
