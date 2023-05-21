package com.c1se16.product.response;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductTree {
    private String key;
    private String parentKey;
    private String name;
    private int quantity;
    private BigDecimal revenue;
    private List<ProductTree> children;
}
