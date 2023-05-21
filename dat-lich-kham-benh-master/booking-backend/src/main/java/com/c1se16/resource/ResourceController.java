package com.c1se16.resource;

import com.c1se16.auhority.constant.AuthorityConstant;
import com.c1se16.resource.response.ResourceResponse;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/resources")
public class ResourceController {

    private final ResourceService service;

    @PostMapping
    public ResourceResponse uploadResource(@RequestParam MultipartFile file, @RequestParam(required = false) String username) throws IOException {
        return this.service.saveImageUser(file, username);
    }

    @PostMapping("/product")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResourceResponse uploadProductImage(@RequestParam MultipartFile image, @RequestParam @NotBlank String code) throws IOException {
        return this.service.saveProductImage(image, code);
    }
}
