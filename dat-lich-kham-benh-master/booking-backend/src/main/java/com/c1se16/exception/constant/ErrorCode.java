package com.c1se16.exception.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    FORBIDDEN(HttpStatus.FORBIDDEN, "Bạn không có quyền thực hiện"),
    NOT_PAID(HttpStatus.BAD_REQUEST, "Bạn chưa thực hiện thanh toán PAYPAL: {0}");

    private final HttpStatus status;
    private final String message;
}
