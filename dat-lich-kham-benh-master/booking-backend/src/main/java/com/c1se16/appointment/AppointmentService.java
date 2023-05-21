package com.c1se16.appointment;

import com.c1se16.appointment.constant.AppointmentStatus;
import com.c1se16.appointment.request.AppointmentCancelRequest;
import com.c1se16.appointment.request.AppointmentCreationRequest;
import com.c1se16.appointment.request.AppointmentSearchRequest;
import com.c1se16.appointment.request.StatisticAppointmentRequest;
import com.c1se16.appointment.response.AppointmentCreationResponse;
import com.c1se16.appointment.response.AppointmentSearchResponse;
import com.c1se16.appointment.response.OverallAppointment;
import com.c1se16.auhority.Authority;
import com.c1se16.core.request.PagingRequest;
import com.c1se16.core.response.ChartResponse;
import com.c1se16.core.response.PagingResponse;
import com.c1se16.core.utils.ChartUtil;
import com.c1se16.core.utils.DateUtil;
import com.c1se16.department.Department;
import com.c1se16.department.DepartmentService;
import com.c1se16.department.response.DepartmentDto;
import com.c1se16.exception.BusinessException;
import com.c1se16.exception.constant.ErrorCode;
import com.c1se16.specialist.Specialist;
import com.c1se16.specialist.SpecialistRepository;
import com.c1se16.user.User;
import com.c1se16.user.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final SpecialistRepository specialistRepository;
    private final DepartmentService departmentService;
    private final ObjectMapper objectMapper;
    private final UserService userService;

    public OverallAppointment getOverallAppointment() {
        Map<String, Object> overallAppointment = this.appointmentRepository.getOverallAppointment();
        return this.objectMapper.convertValue(overallAppointment, OverallAppointment.class);
    }

    public List<ChartResponse> statisticAppointment(StatisticAppointmentRequest req) {
        if (AppointmentStatus.PENDING.equals(req.getStatus())) {
            return ChartUtil.fill12Month(this.appointmentRepository.statisticPendingAppointment(req));
        }

        if (AppointmentStatus.APPROVED.equals(req.getStatus())) {
            return ChartUtil.fill12Month(this.appointmentRepository.statisticApprovedAppointment(req));
        }

        if (AppointmentStatus.CANCEL.equals(req.getStatus())) {
            return ChartUtil.fill12Month(this.appointmentRepository.statisticCancelAppointment(req));
        }
        return ChartUtil.fill12Month(this.appointmentRepository.statisticDoneAppointment(req));
    }

    public PagingResponse<AppointmentSearchResponse> getMyAppointment(PagingRequest<AppointmentSearchRequest> request) {
        User currentUser = this.userService.getNonNullCurrentUser();
        request.getData().setUsername(currentUser.getUsername());
        return this.searchAppointment(request);
    }

    public PagingResponse<AppointmentSearchResponse> getAppointmentOfManager(PagingRequest<AppointmentSearchRequest> request) {
        if (CollectionUtils.isEmpty(request.getData().getDepartmentIds())) {
            request.getData().setDepartmentIds(null);
            List<DepartmentDto> myDepartment = this.departmentService.findMyDepartment();
            if (!myDepartment.isEmpty()) {
                request.getData().setDepartmentIds(myDepartment.stream().map(DepartmentDto::getCode).toList());
            }
        }
        return this.searchAppointment(request);
    }

    public PagingResponse<AppointmentSearchResponse> searchAppointment(PagingRequest<AppointmentSearchRequest> request) {
        Page<AppointmentSearchResponse> myAppointment = this.appointmentRepository.getMyAppointment(request.getData(), request.getData().getStatus(), PageRequest.of(request.getPage() - 1, request.getPageSize()));
        return new PagingResponse<AppointmentSearchResponse>()
                .setPage(request.getPage())
                .setPageSize(request.getPageSize())
                .setTotal(myAppointment.getTotalElements())
                .setTotalPage(myAppointment.getTotalPages())
                .setData(myAppointment.getContent());
    }

    @Transactional
    public void cancelAppointment(AppointmentCancelRequest request) {
        Appointment appointment = this.appointmentRepository.findById(request.getId()).orElseThrow();
        User currentUser = Optional.ofNullable(this.userService.getCurrentUser())
                .orElseThrow(() -> new BusinessException(ErrorCode.FORBIDDEN));

        if (!AppointmentStatus.PENDING.equals(appointment.getStatus()) && !AppointmentStatus.APPROVED.equals(appointment.getStatus())) {
            throw new IllegalArgumentException("Không được phép hủy lịch hẹn");
        }
        appointment.setCanceler(new User(currentUser.getId()));
        appointment.setStatus(AppointmentStatus.CANCEL);
        appointment.setCancelDate(new Date());
        boolean isAdmin = currentUser.getAuthorities()
                .stream()
                .anyMatch(auth -> Authority.ADMIN.equals(auth) || Authority.MANAGER.equals(auth));

        if (isAdmin) {
            appointment.setReasonOfManager(request.getReason());
            this.appointmentRepository.save(appointment);
            return;
        }

        User patient = appointment.getPatient();
        if (!currentUser.getUsername().equals(patient.getUsername())) {
            throw new BusinessException(ErrorCode.FORBIDDEN);
        }
        appointment.setReasonOfPatient(request.getReason());
        this.appointmentRepository.save(appointment);
    }

    public AppointmentCreationResponse createAppointment(AppointmentCreationRequest request) {
        String time = request.getTime();
        request.setTime(null);
        Appointment appointment = this.objectMapper.convertValue(request, Appointment.class);
        appointment.setDepartment(new Department(request.getDepartmentId()));
        appointment.setCreatedDate(new Date());
        appointment.setStatus(AppointmentStatus.PENDING);
        if (Objects.nonNull(request.getSpecialistId())) {
            appointment.setSpecialist(new Specialist(request.getSpecialistId()));
        }
        Date date = DateUtil.safeStringToDate(time, DateUtil.Format.TIMESTAMP);
        appointment.setTime(date);
        User currentUser = this.userService.getCurrentUser();
        if (Objects.nonNull(currentUser)) {
            appointment.setPatient(currentUser);
        }
        Appointment saved = this.appointmentRepository.save(appointment);
        return this.objectMapper.convertValue(saved, AppointmentCreationResponse.class);
    }

    @Transactional
    public void approveAppointment(String id, Integer specialistId) {
        this.changeStatus(id, AppointmentStatus.APPROVED, specialistId);
    }

    @Transactional
    public void finishAppointment(String id) {
        this.changeStatus(id, AppointmentStatus.DONE, null);
    }

    private void changeStatus(String id, AppointmentStatus status, Integer specialistId) {
        Appointment appointment = this.appointmentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy lịch hẹn."));

        if (AppointmentStatus.DONE.equals(status) && !AppointmentStatus.APPROVED.equals(appointment.getStatus())) {
            throw new IllegalArgumentException("Không thể phê duyệt lịch hẹn này.");
        }

        if (AppointmentStatus.APPROVED.equals(status) && !AppointmentStatus.PENDING.equals(appointment.getStatus())) {
            throw new IllegalArgumentException("Không thể phê duyệt lịch hẹn này.");
        }

        User currentUser = this.userService.getNonNullCurrentUser();
        appointment.setApprover(new User(currentUser.getId()));
        appointment.setStatus(AppointmentStatus.APPROVED);
        appointment.setApprovedDate(new Date());

        if (Objects.nonNull(specialistId)) {
            Specialist specialist = this.specialistRepository.findById(specialistId).orElseThrow();
            appointment.setSpecialist(specialist);
        }

        boolean contains = currentUser.getAuthorities().contains(Authority.ADMIN);
        if (contains) {
            this.appointmentRepository.save(appointment);
            return;
        }

        Department department = appointment.getDepartment();
        this.departmentService.findMyDepartment()
                .stream()
                .map(DepartmentDto::getCode)
                .filter(code -> code.equals(department.getCode()))
                .findFirst()
                .orElseThrow(() -> new BusinessException(ErrorCode.FORBIDDEN));
        this.appointmentRepository.save(appointment);
    }
}
