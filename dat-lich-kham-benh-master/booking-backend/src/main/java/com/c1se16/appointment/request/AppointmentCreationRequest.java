package com.c1se16.appointment.request;

import com.c1se16.user.constant.Gender;
import com.c1se16.validation.annotation.ExistAndActive;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class AppointmentCreationRequest {

    @NotBlank
    private String fullName;

    @NotBlank
    private String address;

    @NotNull
    private int age;

    @NotBlank
    @Pattern(regexp = "^(0|\\+84)[0-9]{9}")
    private String phone;

    @NotNull
    private Gender gender;

    @NotNull
    private String time;

    private String description;

    @NotBlank
    @ExistAndActive(message = "Chi nhánh không tồn tại", table = "Department", identifyField = "code")
    private String departmentId;

    @ExistAndActive(message = "Chuyên khoa không tồn tại", table = "Specialist")
    private Integer specialistId;
}
