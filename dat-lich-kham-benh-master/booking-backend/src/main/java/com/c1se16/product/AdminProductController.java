package com.c1se16.product;

import com.c1se16.core.request.PagingRequest;
import com.c1se16.core.response.PagingResponse;
import com.c1se16.product.request.ProductCreationRequest;
import com.c1se16.product.request.ProductSearchRequest;
import com.c1se16.product.request.ProductUpdateRequest;
import com.c1se16.product.response.ProductSearchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/products")
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminProductController {

    private final ProductService productService;

    @PostMapping("/search")
    public PagingResponse<ProductSearchResponse> searchProduct(@RequestBody @Validated PagingRequest<ProductSearchRequest> request) {
        return this.productService.searchProduct(request);
    }

    @PostMapping
    public void createProduct(@RequestBody @Validated ProductCreationRequest request) {
        this.productService.saveProduct(request);
    }

    @PutMapping
    public void updateProduct(@RequestBody @Validated ProductUpdateRequest request) {
        this.productService.updateProduct(request);
    }

    @GetMapping(value = "/change-status", params = {"id"})
    public void changeStatus(@RequestParam Long id) {
        this.productService.changeStatus(id);
    }
}
