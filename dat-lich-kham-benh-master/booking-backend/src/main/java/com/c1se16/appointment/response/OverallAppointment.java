package com.c1se16.appointment.response;

import lombok.Data;

@Data
public class OverallAppointment {

    private int pending;

    private int cancel;

    private int approved;

    private int done;
}
