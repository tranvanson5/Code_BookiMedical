package com.c1se16.department;

import com.c1se16.user.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "department")
public class Department {

    @Id
    @Column(name = "code")
    private String code;

    @Column(name = "address")
    private String address;

    @Column(name = "telephone")
    private String telephone;

    @JsonFormat(pattern = "HH:mm")
    @Column(name = "open_time")
    private LocalTime openTime;

    @JsonFormat(pattern = "HH:mm")
    @Column(name = "close_time")
    private LocalTime closeTime;

    @Column(name = "active")
    private boolean active;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User manager;

    public Department(String code) {
        this.code = code;
    }
}
