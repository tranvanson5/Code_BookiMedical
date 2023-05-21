package com.c1se16.user.response;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public interface HisChangeStatusResponse {

    Long getId();

    Boolean getOldStatus();

    Boolean getNewStatus();

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "GMT+7")
    Date getUpdateDate();

    String getUsername();

    String getUpdater();
}
