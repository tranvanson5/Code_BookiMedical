package com.c1se16.validation.handler;

import com.c1se16.validation.annotation.ExistAndActive;

import java.util.List;

public class ExistAndActiveHandler extends AbstractQueryConstraintValidator<ExistAndActive, Object> {

    private String identifyField;
    private String activeField;

    @Override
    public void initialize(ExistAndActive constraintAnnotation) {
        this.activeField = constraintAnnotation.activeField();
        this.identifyField = constraintAnnotation.identifyField();
        this.tableName = constraintAnnotation.table();
    }

    @Override
    public boolean isValid(List<?> listResult) {
        return !listResult.isEmpty();
    }

    @Override
    public String getHqlToCheck() {
        return String.format("SELECT x FROM %s x WHERE x.%s = :%s AND x.%s = true", this.tableName, this.identifyField, this.getParameterName(), this.activeField);
    }
}
