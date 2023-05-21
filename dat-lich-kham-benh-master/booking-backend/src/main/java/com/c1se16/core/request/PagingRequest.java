package com.c1se16.core.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
@Data
public class PagingRequest<T> {

    @NotNull
    private Integer page;

    @NotNull
    private Integer pageSize;
    private T data;
}
