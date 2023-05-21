package com.c1se16.user.response;

import com.c1se16.auhority.Authority;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Builder
@Data
public class SignUpResponse {
    private Long id;
    private String username;
    private Date dob;
    private String phone;
    private String email;
    private String address;
    private List<Authority> authorities;
}
