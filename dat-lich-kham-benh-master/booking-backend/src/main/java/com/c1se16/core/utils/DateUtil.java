package com.c1se16.core.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {

    @Getter
    @AllArgsConstructor
    public enum Format {
        TIMESTAMP("yyyy-MM-dd HH:mm");
        private final String value;
    }

    @Nullable
    public static Date safeStringToDate(@NonNull String dateStr, @NonNull Format format) {
        try {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format.value);
            return simpleDateFormat.parse(dateStr);
        } catch (Exception ex) {
            return null;
        }
    }
}
