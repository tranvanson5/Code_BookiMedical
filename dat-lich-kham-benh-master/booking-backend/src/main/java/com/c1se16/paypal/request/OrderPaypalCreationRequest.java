package com.c1se16.paypal.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Builder
@Getter
@Setter
public class OrderPaypalCreationRequest {

    @JsonProperty("intent")
    private String intent;

    @JsonProperty("payment_source")
    private Map<String, Object> paymentResource;

    @JsonProperty("purchase_units")
    private List<PurchaseUnit> purchaseUnits;

}
