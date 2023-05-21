package com.c1se16.validation.annotation;

import com.c1se16.validation.handler.ExistAndActiveHandler;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ExistAndActiveHandler.class)
public @interface ExistAndActive {
    String message() default  "";

    String table() default "";

    String identifyField() default "id";

    String activeField() default "active";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
