package com.c1se16.security.jwt;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Setter
@Getter
@Configuration
@ConfigurationProperties(prefix = "spring.jwt")
@ConditionalOnProperty(
        name = {"spring.jwt.enabled"},
        matchIfMissing = true
)
public class JwtConfig {
    private Long expireTime;
    private String keyAlgorithm;
    private int keySize;
}
