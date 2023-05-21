package com.c1se16.specialist;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.OptBoolean;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpecialistDTO implements Serializable {
    private Integer id;

    @NotBlank
    private String name;
    private Integer status;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "UTC", lenient = OptBoolean.FALSE)
    private Timestamp createdDate;
}