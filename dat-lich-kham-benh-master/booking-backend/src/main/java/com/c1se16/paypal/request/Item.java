package com.c1se16.paypal.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Item {

    private String name;
    private Integer quantity;
    private String description;

    @JsonProperty("unit_amount")
    private Amount unitAmount;
}
