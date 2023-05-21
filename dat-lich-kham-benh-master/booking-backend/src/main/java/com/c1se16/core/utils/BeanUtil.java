package com.c1se16.core.utils;

import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

import java.beans.PropertyDescriptor;
import java.util.Objects;
import java.util.stream.Stream;

public class BeanUtil extends org.springframework.beans.BeanUtils {

    public static void copyPropertiesNonNull(Object source, Object target) {
        BeanUtil.copyProperties(source, target, BeanUtil.getNullPropertiesName(source));
    }

    public static String[] getNullPropertiesName(Object target) {
        final BeanWrapper beanWrapper = new BeanWrapperImpl(target);
        return Stream.of(beanWrapper.getPropertyDescriptors())
                .map(PropertyDescriptor::getName)
                .filter(name -> Objects.isNull(beanWrapper.getPropertyValue(name)))
                .toArray(String[]::new);
    }
}