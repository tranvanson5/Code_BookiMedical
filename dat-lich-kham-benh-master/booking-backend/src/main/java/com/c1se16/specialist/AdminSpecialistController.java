package com.c1se16.specialist;

import com.c1se16.core.request.PagingRequest;
import com.c1se16.core.response.PagingResponse;
import com.c1se16.specialist.request.SpecialistCreationRequest;
import com.c1se16.specialist.request.SpecialistSearchRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/specialists")
@RequiredArgsConstructor
public class AdminSpecialistController {

    private final SpecialistService specialistService;

    @PostMapping("/search")
    @PreAuthorize("hasAuthority('ADMIN')")
    public PagingResponse<SpecialistDTO> searchSpecialist(@RequestBody @Validated PagingRequest<SpecialistSearchRequest> request) {
        return this.specialistService.searchSpecialist(request);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public void createSpecialist(@RequestBody @Validated SpecialistCreationRequest request) {
        this.specialistService.createSpecialist(request);
    }

    @GetMapping(value = "/change-status", params = {"id"})
    public void changeStatus(@RequestParam Integer id) {
        this.specialistService.changeStatus(id);
    }
}
