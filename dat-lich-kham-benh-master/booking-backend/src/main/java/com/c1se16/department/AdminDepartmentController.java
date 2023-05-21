package com.c1se16.department;

import com.c1se16.core.request.PagingRequest;
import com.c1se16.core.response.PagingResponse;
import com.c1se16.department.request.DepartmentCreationRequest;
import com.c1se16.department.request.DepartmentSearchRequest;
import com.c1se16.department.request.DepartmentUpdateRequest;
import com.c1se16.department.response.DepartmentDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/departments")
public class AdminDepartmentController {

    private final DepartmentService departmentService;

    @PostMapping("/search")
    public PagingResponse<DepartmentDto> searchDepartment(@RequestBody @Validated PagingRequest<DepartmentSearchRequest> request) {
        return this.departmentService.searchDepartment(request);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public void saveDepartment(@RequestBody @Validated DepartmentCreationRequest request) {
        this.departmentService.saveDepartment(request);
    }

    @PutMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public void updateDepartment(@RequestBody @Validated DepartmentUpdateRequest request) {
        this.departmentService.updateDepartment(request);
    }

    @GetMapping(value = "/change-status", params = {"code"})
    @PreAuthorize("hasAuthority('ADMIN')")
    public void changeStatus(@RequestParam String code) {
        this.departmentService.changeStatus(code);
    }
}
