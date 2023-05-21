package com.c1se16.cart;

import com.c1se16.cart.request.CartCreationRequest;
import com.c1se16.cart.request.SearchCartRequest;
import com.c1se16.cart.request.UpdateQuantityRequest;
import com.c1se16.cart.response.SearchCartResponse;
import com.c1se16.core.request.PagingRequest;
import com.c1se16.core.response.PagingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carts")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping
    public void addToCart(@RequestBody @Validated CartCreationRequest request) {
        this.cartService.addToCart(request);
    }

    @PutMapping
    public void changeQuantity(@RequestBody @Validated UpdateQuantityRequest request) {
        this.cartService.updateCart(request);
    }

    @PostMapping("/my-cart")
    public PagingResponse<SearchCartResponse> getMyCart(@RequestBody @Validated PagingRequest<SearchCartRequest> request) {
        return this.cartService.getMyCart(request);
    }

    @DeleteMapping("/{id}")
    public void deleteCart(@PathVariable Long id) {
        this.cartService.deleteCard(id);
    }
}
