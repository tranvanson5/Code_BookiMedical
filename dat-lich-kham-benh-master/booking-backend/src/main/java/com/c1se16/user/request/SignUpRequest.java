package com.c1se16.user.request;

import com.c1se16.validation.annotation.NonExist;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.validator.constraints.Length;

@EqualsAndHashCode(callSuper = true)
@Data
public class SignUpRequest extends UserUpdateRequest {

    @NonExist(field = "username", table = "User", message = "Tên đăng nhập đã tồn tại!")
    @NotBlank(message = "Tên đăng nhập không đuược trống!")
    @Length(min = 6, message = "Tên đăng nhập tối thiếu 6 ký tự!")
    private String username;

    @NotBlank(message = "Mật khẩu không được trống!")
    @Length(min = 8, message = "Mật khẩu tối thiếu 8 ký tự!")
    private String password;

    @NonExist(field = "email", table = "User", message = "Email đã tồn tại!")
    @Override
    public String getEmail() {
        return super.getEmail();
    }

    @NonExist(field = "phone", table = "User", message = "SĐT đã tồn tại!")
    @Override
    public String getPhone() {
        return super.getPhone();
    }
}
