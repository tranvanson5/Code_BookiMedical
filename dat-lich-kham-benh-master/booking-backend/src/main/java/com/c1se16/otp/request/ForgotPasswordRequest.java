package com.c1se16.otp.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ForgotPasswordRequest {

    @NotBlank
    private String username;

    @NotBlank
    private String email;
}
