package com.c1se16.core.utils;

import java.util.UUID;

public class RandomUtil {

    public static String random() {
        return UUID.randomUUID().toString();
    }

    public static String randomNumberWithLength(int length) {
        StringBuilder random = new StringBuilder();
        for (int i = 0; i < length; i++) {
            random.append(Math.round(Math.random() * 9));
        }
        return random.toString();
    }
}
