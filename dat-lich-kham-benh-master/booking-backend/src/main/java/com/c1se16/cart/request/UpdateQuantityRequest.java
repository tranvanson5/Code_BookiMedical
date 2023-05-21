package com.c1se16.cart.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateQuantityRequest {

    @NotNull
    private Long cartId;

    @NotNull
    private Integer quantity;
}
