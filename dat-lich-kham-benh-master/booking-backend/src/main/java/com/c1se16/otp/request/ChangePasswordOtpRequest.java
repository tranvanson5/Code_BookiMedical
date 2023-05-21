package com.c1se16.otp.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.validator.constraints.Length;

@EqualsAndHashCode(callSuper = true)
@Data
public class ChangePasswordOtpRequest extends ConfirmOtpRequest {

    @NotBlank(message = "Mật khẩu không được trống!")
    @Length(min = 8, message = "Mật khẩu tối thiếu 8 ký tự!")
    private String newPassword;
}
