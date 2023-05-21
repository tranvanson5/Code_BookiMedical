package com.c1se16.validation.handler;

import com.c1se16.validation.annotation.NonExist;
public class NonExistHandler extends AbstractQueryConstraintValidator<NonExist, Object> {
    private String fieldName;

    @Override
    public void initialize(NonExist constraintAnnotation) {
        this.tableName = constraintAnnotation.table();
        this.fieldName = constraintAnnotation.field();
    }

    @Override
    public String getHqlToCheck() {
        return String.format("SELECT x.%s FROM %s x WHERE x.%s = :%s", this.fieldName, this.tableName, this.fieldName, this.getParameterName());
    }
}
