package com.c1se16.user.request;

import com.c1se16.auhority.Authority;
import lombok.Data;

@Data
public class UserSearchRequest {
    private String username;
    private Boolean status;
    private Authority authority;
}
