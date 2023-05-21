package com.c1se16.bill.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class BillCreationRequest {

    @NotNull
    private List<Long> cartIds;
}
