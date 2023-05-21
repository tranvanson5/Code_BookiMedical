package com.c1se16.user.request;

import com.c1se16.user.constant.Gender;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import java.util.Date;

@Data
public class UserUpdateRequest {

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dob;

    @NotBlank(message = "Họ và tên không được trống!")
    private String fullName;

    private Gender gender;

    @NotBlank(message = "SĐT không được trống!")
    @Length(max = 12, message = "SĐT tối đa 12 ký tự")
    @Pattern(regexp = "^(0|\\+84)[0-9]{9}", message = "SĐT không đúng định dạng!")
    private String phone;

    @NotBlank(message = "Email không được trống!")
    @Email(message = "Email không đúng định dạng!")
    private String email;

    private String address;

    private String avatar;
}
