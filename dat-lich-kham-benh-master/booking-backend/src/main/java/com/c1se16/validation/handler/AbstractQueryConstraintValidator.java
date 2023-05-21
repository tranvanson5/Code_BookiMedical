package com.c1se16.validation.handler;

import com.c1se16.validation.annotation.Exist;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

import java.lang.annotation.Annotation;
import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

public abstract class AbstractQueryConstraintValidator<A extends Annotation, T> implements ConstraintValidator<A, T> {

    @Autowired
    protected EntityManager entityManager;

    protected String tableName;

    protected Exist.StaticParam[] staticParam;

    @Override
    public boolean isValid(T t, ConstraintValidatorContext constraintValidatorContext) {
        if (Objects.isNull(t)) return Boolean.TRUE;
        String hqlToCheck = this.getHqlToCheck();
        Query query = this.entityManager.createQuery(hqlToCheck);
        query.setParameter(this.getParameterName(), t);
        return this.isValid(query.getResultList());
    }

    public boolean isValid(List<?> listResult) {
        return listResult.isEmpty();
    }

    public abstract String getHqlToCheck();

    public String getParameterName() {
        return "value";
    };

    protected String getParamAsWhere(String aliasTable) {
        List<String> list = Stream.ofNullable(this.staticParam)
                .flatMap(Stream::of)
                .map(x -> {
                    String separator = " = ";
                    if (x.value().startsWith("IS")) {
                        separator = "  ";
                    }
                    return aliasTable + "." + x.name() + separator + x.value();
                })
                .toList();
        return list.isEmpty() ? " 1 = 1" : String.join(" AND ", list);
    }
}
