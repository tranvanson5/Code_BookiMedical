package com.c1se16.paypal.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Breakdown {

    @JsonProperty("item_total")
    private Amount itemTotal;
}
