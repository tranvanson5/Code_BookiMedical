package com.c1se16.appointment.request;

import com.c1se16.appointment.constant.AppointmentStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class AppointmentSearchRequest {
    private String fullName;

    @Enumerated(EnumType.STRING)
    private AppointmentStatus status;
    private Date time;
    private String username;

    private List<String> departmentIds;
}
