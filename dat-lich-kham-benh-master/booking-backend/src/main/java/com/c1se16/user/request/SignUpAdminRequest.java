package com.c1se16.user.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class SignUpAdminRequest extends SignUpRequest {

    @NotBlank(message = "Chưa chọn quyền")
    private String authority;
}
