package com.c1se16.email;

import com.c1se16.email.constant.EmailTemplate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import org.springframework.validation.annotation.Validated;

import java.util.Map;

@Validated
@Data
@Builder
public class EmailDTO {
    @NotNull
    private String[] to;
    @NotBlank
    private String subject;
    @NotNull
    private EmailTemplate template;

    private Map<String, Object> data;
}