package com.c1se16.product.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ProductUpdateRequest extends ProductBaseRequest {

    @NotNull
    private Long id;

    @JsonIgnore
    @Override
    public String getCode() {
        return super.getCode();
    }
}
