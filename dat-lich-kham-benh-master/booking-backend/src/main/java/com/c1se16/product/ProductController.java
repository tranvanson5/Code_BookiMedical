package com.c1se16.product;

import com.c1se16.core.request.PagingRequest;
import com.c1se16.core.response.PagingResponse;
import com.c1se16.product.request.ProductSearchRequest;
import com.c1se16.product.response.MyProductResponse;
import com.c1se16.product.response.ProductSearchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping("/search")
    public PagingResponse<ProductSearchResponse> findAll(@RequestBody @Validated PagingRequest<ProductSearchRequest> request) {
        request.getData().setStatus(Boolean.TRUE);
        return this.productService.searchProduct(request);
    }

    @PostMapping("/my-product")
    public PagingResponse<MyProductResponse> getMyProduct(@RequestBody @Validated PagingRequest<?> request) {
        return this.productService.getMyProduct(request);
    }
}
