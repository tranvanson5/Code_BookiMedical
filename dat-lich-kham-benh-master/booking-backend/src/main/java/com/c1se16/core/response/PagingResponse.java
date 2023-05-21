package com.c1se16.core.response;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain = true)
public class PagingResponse<T> {
    private long total;
    private int totalPage;
    private List<T> data;
    private int page;
    private int pageSize;
}
