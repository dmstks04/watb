package com.watb.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.siot.IamportRestClient.IamportClient;

@Configuration
public class PaymentConfig {
    String apiKey = "6512024448041304";
    String secretKey = "UqkdP3rqiBnoy8BGRm1cKG6CFeC5TzvYn5j4NbnmqBW5akJHFauTfth4wRCYphy6ga0try0XinMVoQjZ";

    @Bean
    public IamportClient iamportClient() {
        return new IamportClient(apiKey, secretKey);
    }
}
