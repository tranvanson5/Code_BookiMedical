package com.c1se16.paypal;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.client.RestTemplate;

@Profile(value = "paypal")
@ConfigurationProperties(prefix = "paypal")
@Configuration
@Setter
@Getter
public class PaypalConfig {

    private String clientId;
    private String clientSecret;
    private String baseUrl;
    private String paymentResource;
    private String redirectAfterPayment;

    @Bean("restTemplatePaypal")
    public RestTemplate restTemplatePaypal() {
        return new RestTemplateBuilder()
                .basicAuthentication(this.clientId, this.clientSecret)
                .rootUri(this.baseUrl)
                .build();
    }
}
