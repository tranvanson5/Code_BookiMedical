package com.c1se16.department;

import com.c1se16.department.response.DepartmentDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/departments")
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentService departmentService;

    @GetMapping
    public List<DepartmentDto> findAll() {
        return this.departmentService.findAllDepartment();
    }

    @GetMapping("/mine")
    @PreAuthorize("hasAnyAuthority('MANAGER')")
    public List<DepartmentDto> getMyDepartment() {
        return this.departmentService.findMyDepartment();
    }
}
