package com.c1se16.paypal.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class PurchaseUnit {

    private List<Item> items;
    private Amount amount;

}
