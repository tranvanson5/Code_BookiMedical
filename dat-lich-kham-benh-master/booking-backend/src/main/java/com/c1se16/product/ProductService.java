package com.c1se16.product;

import com.c1se16.core.request.PagingRequest;
import com.c1se16.core.response.PagingResponse;
import com.c1se16.product.request.ProductCreationRequest;
import com.c1se16.product.request.ProductSearchRequest;
import com.c1se16.product.request.ProductUpdateRequest;
import com.c1se16.product.response.MyProductResponse;
import com.c1se16.product.response.ProductSearchResponse;
import com.c1se16.user.User;
import com.c1se16.user.UserDTO;
import com.c1se16.user.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ObjectMapper objectMapper;
    private final UserService userService;

    public Product findExistProduct(Long id) {
        return this.productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Sản phẩm không tồn tại"));
    }

    public PagingResponse<ProductSearchResponse> searchProduct(PagingRequest<ProductSearchRequest> request) {
        Page<Product> products = this.productRepository.searchProduct(request.getData(), PageRequest.of(request.getPage() - 1, request.getPageSize()));
        return new PagingResponse<ProductSearchResponse>()
                .setPage(request.getPage())
                .setPageSize(request.getPageSize())
                .setTotal(products.getTotalElements())
                .setTotalPage(products.getTotalPages())
                .setData(
                        products.getContent().stream()
                                .map(x -> {
                                    UserDTO userDTO = this.objectMapper.convertValue(x.getCreator(), UserDTO.class);
                                    ProductSearchResponse productSearchResponse = this.objectMapper.convertValue(x, ProductSearchResponse.class);
                                    productSearchResponse.setCreator(userDTO);
                                    return productSearchResponse;
                                })
                                .toList()
                );
    }

    public PagingResponse<MyProductResponse> getMyProduct(PagingRequest<?> request) {
        User currentUser = this.userService.getNonNullCurrentUser();
        Page<Map<String, Object>> products = this.productRepository.getMyProduct(currentUser.getId(), PageRequest.of(request.getPage() - 1, request.getPageSize()));
        return new PagingResponse<MyProductResponse>()
                .setPage(request.getPage())
                .setPageSize(request.getPageSize())
                .setTotal(products.getTotalElements())
                .setTotalPage(products.getTotalPages())
                .setData(
                        products.getContent().stream()
                                .map(x -> this.objectMapper.convertValue(x, MyProductResponse.class))
                                .toList()
                );
    }

    @Transactional
    public void saveProduct(ProductCreationRequest request) {
        User currentUser = this.userService.getNonNullCurrentUser();
        Product product = this.objectMapper.convertValue(request, Product.class);
        product.setCreator(currentUser);
        product.setStatus(request.getStatus() == 1);
        this.productRepository.save(product);
    }

    @Transactional
    public void updateProduct(ProductUpdateRequest request) {
        Product productInDb = this.findExistProduct(request.getId());
        Product product = this.objectMapper.convertValue(request, Product.class);
        product.setCreator(productInDb.getCreator());
        product.setCreatedDate(productInDb.getCreatedDate());
        product.setCode(productInDb.getCode());
        product.setStatus(request.getStatus() == 1);
        this.productRepository.save(product);
    }

    @Transactional
    public void changeStatus(Long id) {
        Product existProduct = this.findExistProduct(id);
        existProduct.setStatus(!existProduct.getStatus());
        this.productRepository.save(existProduct);
    }
}
