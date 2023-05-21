package com.c1se16.specialist.request;

import lombok.Data;

@Data
public class SpecialistSearchRequest {
    private String name;
    private Boolean status;

    public void setStatus(Integer status) {
        if (status == null) return;
        this.status = status == 1;
    }
}
