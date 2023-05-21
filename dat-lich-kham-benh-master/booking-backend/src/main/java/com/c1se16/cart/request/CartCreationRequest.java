package com.c1se16.cart.request;

import com.c1se16.validation.annotation.ExistAndActive;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CartCreationRequest {

    @NotNull
    @ExistAndActive(
            activeField = "status",
            table = "Product",
            message = "Sản phẩm không tồn tại."
    )
    private Long productId;

    @NotNull
    @Min(value = 1)
    private Integer quantity;
}
