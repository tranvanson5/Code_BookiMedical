package com.c1se16.exception;

import com.c1se16.exception.constant.ErrorCode;
import lombok.Getter;

import java.text.MessageFormat;

@Getter
public class BusinessException extends RuntimeException {

    private final ErrorCode errorCode;

    public BusinessException(ErrorCode errorCode) {
        this(errorCode, new Object[]{});
    }

    public BusinessException(ErrorCode errorCode, Object...params) {
        super(MessageFormat.format(errorCode.getMessage(), params));
        this.errorCode = errorCode;
    }
}
