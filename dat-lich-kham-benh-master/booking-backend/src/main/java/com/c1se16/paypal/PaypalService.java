package com.c1se16.paypal;

import com.c1se16.cart.Cart;
import com.c1se16.core.utils.CurrencyUtil;
import com.c1se16.paypal.request.*;
import com.c1se16.paypal.response.OrderPaypalCreationResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.*;

@Service
@RequiredArgsConstructor
@ConditionalOnBean(value = {PaypalConfig.class})
public class PaypalService {

    private final PaypalConfig paypalConfig;

    private final ObjectMapper objectMapper;
    private final RestTemplate restTemplatePaypal;

    public Map<String, Object> getPaypalBill(String id) {
        ResponseEntity<Map<String, Object>> forEntity = this.restTemplatePaypal.exchange("/checkout/orders/" + id, HttpMethod.GET, null, new ParameterizedTypeReference<>() {});
        if (!forEntity.getStatusCode().equals(HttpStatusCode.valueOf(200)) || forEntity.getBody() == null) {
            throw new RuntimeException();
        }
        return forEntity.getBody();
    }

    public OrderPaypalCreationResponse createOrder(List<Cart> carts, String billId) throws JsonProcessingException {

        MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
        headers.put("PayPal-Request-Id", List.of(UUID.randomUUID().toString()));
        headers.put("Content-Type", List.of(MediaType.APPLICATION_JSON_VALUE));

        String json = this.paypalConfig.getPaymentResource().replace("@{billId}", billId);
        Map<String, Object> paymentResource = this.objectMapper.readValue(json, new TypeReference<>() {});

        List<Item> items = new ArrayList<>();
        BigDecimal total = new BigDecimal(0);

        for (Cart cart : carts) {
            BigDecimal usdPrice = CurrencyUtil.vndToUsd(cart.getProduct().getPrice());
            Item item = new Item();
            item.setDescription("Cart Id: " + cart.getId());
            item.setName(cart.getProduct().getName());
            item.setQuantity(cart.getQuantity());
            item.setUnitAmount(new Amount("USD", usdPrice));
            items.add(item);
            total = total.add(usdPrice.multiply(new BigDecimal(cart.getQuantity())));
        }

        Breakdown breakdown = new Breakdown(new Amount("USD", total));

        OrderPaypalCreationRequest build = OrderPaypalCreationRequest.builder()
                .intent("AUTHORIZE")
                .paymentResource(paymentResource)
                .purchaseUnits(List.of(new PurchaseUnit(items, new Amount("USD", total, breakdown))))
                .build();
        HttpEntity<OrderPaypalCreationRequest> httpEntity = new HttpEntity<>(build,headers);

        ResponseEntity<Map<String, Object>> exchange = this.restTemplatePaypal.exchange("/checkout/orders", HttpMethod.POST, httpEntity, new ParameterizedTypeReference<>() {});
        Map<String, Object> body = exchange.getBody();
        String paymentUrl = Optional.ofNullable(body.get("links"))
                .map(l -> (List<Map>) l)
                .stream()
                .flatMap(List::stream)
                .map(x -> x.get("href"))
                .map(Object::toString)
                .filter(x -> x.contains("checkoutnow?token="))
                .findFirst()
                .orElseThrow();
        String id = body.get("id").toString();
        return OrderPaypalCreationResponse.builder()
                .id(id)
                .linkPayment(paymentUrl)
                .build();
    }
}
