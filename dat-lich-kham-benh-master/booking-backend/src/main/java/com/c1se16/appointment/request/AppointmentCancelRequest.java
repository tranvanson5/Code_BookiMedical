package com.c1se16.appointment.request;

import com.c1se16.validation.annotation.Exist;
import com.c1se16.validation.annotation.Exist.StaticParam;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AppointmentCancelRequest {

    @NotBlank
//    @Exist(
//            table = "Appointment",
//            field = "id",
//            message = "Lịch hẹn không tồn tại",
//            staticParam = {
//                    @StaticParam(name = "status", value = "PENDING"),
//                    @StaticParam(name = "status", value = "APPROVED"),
//                    @StaticParam(name = "patient", value = "IS NOT NULL")
//            }
//    )
    private String id;

    @NotBlank
    private String reason;
}
