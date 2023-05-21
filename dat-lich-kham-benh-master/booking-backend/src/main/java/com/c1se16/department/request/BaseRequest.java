package com.c1se16.department.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalTime;

@Data
public class BaseRequest {
    private String code;

    @NotBlank
    private String address;

    @NotNull
    @JsonFormat(pattern = "HH:mm")
    private LocalTime openTime;

    @NotNull
    @JsonFormat(pattern = "HH:mm")
    private LocalTime closeTime;

    @NotNull
    private Integer status;

    @NotNull
    private Long manager;

    @NotBlank
    private String telephone;
}
