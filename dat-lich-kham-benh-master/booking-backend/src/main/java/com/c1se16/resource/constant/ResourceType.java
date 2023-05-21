package com.c1se16.resource.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResourceType {

    IMAGE_USER("images/user/"),
    IMAGE_PRODUCT("images/product/");

    private final String path;
}
