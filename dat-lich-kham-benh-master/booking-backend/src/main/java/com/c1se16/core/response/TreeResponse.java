package com.c1se16.core.response;

import lombok.Data;

import java.util.List;

@Data
public class TreeResponse<T> {
    private String key;
    private String parentKey;
    private T data;
    private List<TreeResponse<T>> children;
}
