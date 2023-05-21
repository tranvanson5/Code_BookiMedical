package com.c1se16.product.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import java.math.BigDecimal;

@Data
public class ProductBaseRequest {
    private String code;

    @NotBlank
    private String name;

    @NotNull
    @Min(value = 1)
    private BigDecimal price;

    @NotBlank
    @Length(max = 255)
    private String shortDescription;

    @NotBlank
    private String fullDescription;

    @NotBlank
    private String avatar;

    @NotNull
    private Integer status;
}
