package com.c1se16.appointment.request;

import com.c1se16.appointment.constant.AppointmentStatus;
import lombok.Data;

@Data
public class StatisticAppointmentRequest {

    AppointmentStatus status;
    String departmentId;
    Integer year;
}
