package com.c1se16.auhority;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin/authorities")
@RequiredArgsConstructor
public class AdminAuthorityController {

    private final AuthorityService authorityService;

    @GetMapping
    public List<Authority> getAll() {
        return this.authorityService.findAll();
    }
}
