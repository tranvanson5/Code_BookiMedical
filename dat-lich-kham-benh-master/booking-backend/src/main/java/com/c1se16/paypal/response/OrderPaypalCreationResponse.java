package com.c1se16.paypal.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderPaypalCreationResponse {
    private String id;
    private String linkPayment;
}
