package com.c1se16.user.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class ChangePasswordRequest {

    @NotBlank
    private String password;

    @NotBlank
    @Length(min = 8)
    private String newPassword;
}
