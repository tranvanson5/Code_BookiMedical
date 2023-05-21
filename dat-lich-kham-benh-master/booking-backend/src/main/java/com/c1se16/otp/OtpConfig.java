package com.c1se16.otp;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "otp")
@Setter
@Getter
public class OtpConfig {
    private int length;
    private int expireTime;
}
