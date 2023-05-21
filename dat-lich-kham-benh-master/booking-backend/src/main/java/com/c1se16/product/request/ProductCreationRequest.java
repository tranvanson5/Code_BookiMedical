package com.c1se16.product.request;

import com.c1se16.validation.annotation.NonExist;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ProductCreationRequest extends ProductBaseRequest {

    @NotBlank
    @NonExist(field = "code", table = "Product", message = "Mã sản phẩm đã tồn tại")
    @Override
    public String getCode() {
        return super.getCode();
    }
}
