package com.c1se16.validation.handler;

import com.c1se16.validation.annotation.Exist;

import java.util.List;

public class ExistHandler extends AbstractQueryConstraintValidator<Exist, Object> {

    private String fieldName;

    @Override
    public void initialize(Exist constraintAnnotation) {
        this.tableName = constraintAnnotation.table();
        this.fieldName = constraintAnnotation.field();
        this.staticParam = constraintAnnotation.staticParam();
    }

    @Override
    public boolean isValid(List<?> listResult) {
        return !listResult.isEmpty();
    }

    @Override
    public String getHqlToCheck() {
        return String.format("SELECT x FROM %s x WHERE x.%s = :%s AND %s", this.tableName, this.fieldName, this.getParameterName(), this.getParamAsWhere("x"));
    }
}
