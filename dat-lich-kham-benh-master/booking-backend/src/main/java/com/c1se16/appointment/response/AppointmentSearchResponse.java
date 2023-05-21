package com.c1se16.appointment.response;

import com.c1se16.appointment.constant.AppointmentStatus;
import com.c1se16.user.constant.Gender;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.util.Date;

public interface AppointmentSearchResponse {

    String getId();

    String getFullName();

    int getAge();

    String getPhone();

    Gender getGender();

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "GMT+7")
    Date getTime();

    @Enumerated(EnumType.STRING)
    AppointmentStatus getStatus();

    String getDepartmentName();

    String getSpecialistName();

    String getReasonOfPatient();

    String getReasonOfManager();

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "GMT+7")
    Date getApprovedDate();

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "GMT+7")
    Date getCancelDate();

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "GMT+7")
    Date getDoneDate();

}
