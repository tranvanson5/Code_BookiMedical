package com.c1se16.validation.annotation;

import com.c1se16.validation.handler.ExistHandler;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ExistHandler.class)
public @interface Exist {

    String message() default  "";
    String field() default "";

    String table() default "";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    StaticParam[] staticParam() default {};

    @interface StaticParam {
        String name();
        String value();
    }
}
