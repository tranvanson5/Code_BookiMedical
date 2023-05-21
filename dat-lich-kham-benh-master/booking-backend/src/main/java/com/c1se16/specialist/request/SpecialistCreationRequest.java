package com.c1se16.specialist.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SpecialistCreationRequest {

    private Long id;

    @NotBlank
    private String name;

    @NotNull
    private Integer status;
}
