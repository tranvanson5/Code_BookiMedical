package com.c1se16.user;

import com.c1se16.auhority.Authority;
import com.c1se16.department.Department;
import com.c1se16.department.response.DepartmentDto;
import com.c1se16.user.constant.Gender;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class UserDTO implements UserDetails {

    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dob;
    private String username;

    private String fullName;
    @JsonIgnore
    private String password;
    private String phone;
    private String address;
    private String email;
    private boolean active;
    private Gender gender;
    private String avatar;
    private List<Authority> authorities;

    private List<DepartmentDto> departments;

    public List<Authority> getAuthoritiesList() {
        return this.authorities;
    }

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (Objects.isNull(this.authorities)) return List.of();
        return this.authorities.stream()
                .map(Authority::getCode)
                .map(SimpleGrantedAuthority::new)
                .toList();
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return this.active;
    }
}