package com.c1se16.department.request;

import com.c1se16.validation.annotation.NonExist;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class DepartmentCreationRequest extends BaseRequest {

    @NotBlank
    @NonExist(field = "code", table = "Department", message = "Mã chi nhánh đã tồn tại")
    @Override
    public String getCode() {
        return super.getCode();
    }
}
