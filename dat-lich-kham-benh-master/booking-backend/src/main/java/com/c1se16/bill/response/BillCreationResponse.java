package com.c1se16.bill.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BillCreationResponse {

    private String linkPayment;
}
