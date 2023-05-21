package com.c1se16.appointment;

import com.c1se16.appointment.request.AppointmentCancelRequest;
import com.c1se16.appointment.request.AppointmentCreationRequest;
import com.c1se16.appointment.request.AppointmentSearchRequest;
import com.c1se16.appointment.response.AppointmentCreationResponse;
import com.c1se16.appointment.response.AppointmentSearchResponse;
import com.c1se16.auhority.constant.AuthorityConstant;
import com.c1se16.core.request.PagingRequest;
import com.c1se16.core.response.PagingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping("/my-appointment")
    @PreAuthorize("hasAuthority('" + AuthorityConstant.USER + "')")
    public PagingResponse<AppointmentSearchResponse> getMyAppointment(@RequestBody @Validated PagingRequest<AppointmentSearchRequest> request) {
        return this.appointmentService.getMyAppointment(request);
    }

    @PostMapping("/search")
    @PreAuthorize("hasAnyAuthority('" + AuthorityConstant.MANGER +"," + AuthorityConstant.ADMIN + "')")
    public PagingResponse<AppointmentSearchResponse> searchAppointment(@RequestBody @Validated PagingRequest<AppointmentSearchRequest> request) {
        return this.appointmentService.getAppointmentOfManager(request);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('" + AuthorityConstant.USER + "')")
    public AppointmentCreationResponse createAppointment(@RequestBody @Validated AppointmentCreationRequest request) {
        return this.appointmentService.createAppointment(request);
    }

    @PostMapping("/cancel")
    public void cancelAppointment(@RequestBody @Validated AppointmentCancelRequest request) {
        this.appointmentService.cancelAppointment(request);
    }
}
