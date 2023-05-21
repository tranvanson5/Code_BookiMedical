package com.c1se16.product.request;

import lombok.Data;

@Data
public class ProductSearchRequest {

    private String codeName;
    private Boolean status;
    private Long userId;
}
