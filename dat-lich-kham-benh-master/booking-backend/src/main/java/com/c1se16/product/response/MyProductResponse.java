package com.c1se16.product.response;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class MyProductResponse extends ProductSearchResponse {
    private Integer quantity;
    private String uuid;
}
