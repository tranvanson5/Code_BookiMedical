package com.c1se16.cart.response;

import com.c1se16.product.Product;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SearchCartResponse {

    private Long id;
    private Product product;
    private Integer quantity;
}
