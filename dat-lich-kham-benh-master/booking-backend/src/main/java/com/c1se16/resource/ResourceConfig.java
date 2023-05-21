package com.c1se16.resource;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "spring.resource")
@Setter
@Getter
public class ResourceConfig {

    private String basePath;
}
