package com.c1se16.appointment.response;

import com.c1se16.appointment.constant.AppointmentStatus;
import com.c1se16.user.constant.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentCreationResponse {
    private String id;
    private String fullName;
    private String address;
    private int age;
    private String phone;
    private Gender gender;
    private Date time;
    private String description;
    private AppointmentStatus status;
}