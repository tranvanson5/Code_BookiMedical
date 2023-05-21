package com.c1se16.validation.annotation;

import com.c1se16.validation.handler.NonExistHandler;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = NonExistHandler.class)
public @interface NonExist {

    String message() default  "";
    String field() default "";

    String table() default "";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
