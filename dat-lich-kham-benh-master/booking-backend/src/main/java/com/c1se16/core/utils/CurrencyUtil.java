package com.c1se16.core.utils;

import java.math.BigDecimal;

public class CurrencyUtil {

    public static BigDecimal vndToUsd(BigDecimal money) {
        return money.divide(new BigDecimal(20_000));
    }
}
