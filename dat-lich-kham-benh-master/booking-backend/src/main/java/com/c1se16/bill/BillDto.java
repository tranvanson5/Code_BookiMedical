package com.c1se16.bill;

import com.c1se16.bill.constant.BillStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BillDto {
    private String id;
    private String billPaypalId;
    private String paymentLink;
    private BillStatus status;
    private Date createdDate;
    private BigDecimal total;
    private String username;
}