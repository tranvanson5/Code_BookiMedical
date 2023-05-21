package com.c1se16.auhority;

import com.c1se16.auhority.constant.AuthorityConstant;
import com.c1se16.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Objects;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "AUTHORITY")
public class Authority {

    @Transient
    public static final Authority ADMIN = new Authority(AuthorityConstant.ADMIN);

    @Transient
    public static final Authority USER = new Authority(AuthorityConstant.USER);

    @Transient
    public static final Authority MANAGER = new Authority(AuthorityConstant.MANGER);

    @Id
    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "is_default")
    private boolean isDefault;

    @JsonIgnore
    @ManyToMany(mappedBy = "authorities")
    private List<User> users;

    public Authority(String code) {
        this.code = code;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Authority authority = (Authority) o;
        return Objects.equals(code, authority.code);
    }

    @Override
    public int hashCode() {
        return Objects.hash(code);
    }
}
