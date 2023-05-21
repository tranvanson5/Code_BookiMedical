package com.c1se16.specialist;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.OptBoolean;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "specialist")
public class Specialist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "active")
    private boolean active;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "UTC", lenient = OptBoolean.FALSE)
    @Temporal(TemporalType.DATE)
    @Column(name = "created_date", updatable = false)
    @CreationTimestamp
    private Date createdDate;

    public Specialist(Integer id) {
        this.id = id;
    }
}
