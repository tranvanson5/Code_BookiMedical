package com.c1se16.cart.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
public class SearchCartRequest {

    @JsonIgnore
    private Long userId;
}
