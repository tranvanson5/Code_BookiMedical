package com.c1se16.bill.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.util.Date;

@Data
public class SearchBillRequest {

    private String idOrName;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date createdDate;

    @JsonIgnore
    private Long userId;
}
