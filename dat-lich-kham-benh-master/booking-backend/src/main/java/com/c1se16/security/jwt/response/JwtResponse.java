package com.c1se16.security.jwt.response;

import com.c1se16.user.UserDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JwtResponse {

    private String jwt;
    private UserDTO user;

    @JsonIgnore
    private byte[] publicKey;
}
