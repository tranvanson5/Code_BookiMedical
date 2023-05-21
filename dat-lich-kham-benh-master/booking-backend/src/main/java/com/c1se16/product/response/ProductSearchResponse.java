package com.c1se16.product.response;

import com.c1se16.user.UserDTO;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class ProductSearchResponse {
    private Long id;
    private String code;
    private String name;
    private BigDecimal price;
    private String shortDescription;
    private String fullDescription;
    private Date createdDate;
    private Date updatedDate;
    private Integer status;
    private String avatar;
    private UserDTO creator;

    public void setStatus(boolean status) {
        this.status = status ? 1 : 0;
    }
}
