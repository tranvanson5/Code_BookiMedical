package com.c1se16.cart;

import com.c1se16.cart.request.CartCreationRequest;
import com.c1se16.cart.request.SearchCartRequest;
import com.c1se16.cart.request.UpdateQuantityRequest;
import com.c1se16.cart.response.SearchCartResponse;
import com.c1se16.core.request.PagingRequest;
import com.c1se16.core.response.PagingResponse;
import com.c1se16.exception.BusinessException;
import com.c1se16.exception.constant.ErrorCode;
import com.c1se16.product.Product;
import com.c1se16.user.User;
import com.c1se16.user.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final UserService userService;

    public Cart findById(Long id) {
        return this.cartRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy giỏ hàng: " + id));
    }

    public PagingResponse<SearchCartResponse> getMyCart(PagingRequest<SearchCartRequest> request) {
        User currentUser = this.userService.getNonNullCurrentUser();
        request.getData().setUserId(currentUser.getId());
        Page<Cart> carts = this.cartRepository.searchCart(request.getData(), PageRequest.of(request.getPage() - 1, request.getPageSize()));
        return new PagingResponse<SearchCartResponse>()
                .setPage(request.getPage())
                .setPageSize(request.getPageSize())
                .setTotal(carts.getTotalElements())
                .setTotalPage(carts.getTotalPages())
                .setData(carts.getContent().stream()
                        .map(c -> {
                            return SearchCartResponse.builder()
                                    .id(c.getId())
                                    .product(c.getProduct())
                                    .quantity(c.getQuantity())
                                    .build();
                        }).toList()
                );
    }

    @Transactional
    public void deleteCard(Long id) {
        Cart cart = this.findById(id);
        this.checkRoleWith(cart.getUser().getId());
        this.cartRepository.delete(cart);
    }

    @Transactional
    public void addToCart(CartCreationRequest request) {
        User currentUser = this.userService.getNonNullCurrentUser();
        Product product = new Product(request.getProductId());
        Optional<Cart> opt = this.cartRepository.findByUserAndProduct(currentUser, product);
        if (opt.isPresent()) {
            Cart cart = opt.get();
            cart.setQuantity(cart.getQuantity() + request.getQuantity());
            this.cartRepository.save(cart);
            return;
        }
        Cart cart = new Cart();
        cart.setUser(currentUser);
        cart.setProduct(product);
        cart.setQuantity(request.getQuantity());
        this.cartRepository.save(cart);
    }

    @Transactional
    public void updateCart(UpdateQuantityRequest request) {
        Cart cart = this.findById(request.getCartId());
        this.checkRoleWith(cart.getUser().getId());
        cart.setQuantity(request.getQuantity());
        this.cartRepository.save(cart);
    }

    private void checkRoleWith(Long userId) {
        User currentUser = this.userService.getNonNullCurrentUser();
        if (!currentUser.getId().equals(userId)) {
            throw new BusinessException(ErrorCode.FORBIDDEN);
        }
    }
}
