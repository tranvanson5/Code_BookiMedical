package com.c1se16.paypal.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Amount {

    @JsonProperty("currency_code")
    private String currencyCode;
    private BigDecimal value;
    private Breakdown breakdown;

    public Amount(String currencyCode, BigDecimal value) {
        this(currencyCode, value, null);
    }
}
