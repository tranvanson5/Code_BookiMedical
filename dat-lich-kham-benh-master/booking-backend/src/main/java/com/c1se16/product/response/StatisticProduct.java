package com.c1se16.product.response;

import java.math.BigDecimal;

public interface StatisticProduct {

    String getCode();

    String getName();

    int getQuantity();

    BigDecimal getRevenue();
}
