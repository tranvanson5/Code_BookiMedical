package com.c1se16.user.response;

import com.c1se16.auhority.Authority;
import com.c1se16.user.constant.Gender;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class UserSearchResponse {

    Long id;

    String username;

    String fullName;

    @JsonFormat(pattern = "yyyy-MM-dd")
    Date dob;

    List<Authority> authorities;

    Integer status;

    String phone;

    String email;

    String address;

    Gender gender;

    String avatar;
}