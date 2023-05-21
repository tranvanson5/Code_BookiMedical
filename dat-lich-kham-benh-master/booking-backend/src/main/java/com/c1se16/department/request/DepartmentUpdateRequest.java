package com.c1se16.department.request;

import com.c1se16.validation.annotation.Exist;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class DepartmentUpdateRequest extends BaseRequest {


    @NotBlank
    @Exist(field = "code", table = "Department", message = "Mã chi nhánh không tồn tại")
    @Override
    public String getCode() {
        return super.getCode();
    }
}
