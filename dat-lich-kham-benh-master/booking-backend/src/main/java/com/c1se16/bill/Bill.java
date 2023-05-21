package com.c1se16.bill;

import com.c1se16.bill.constant.BillStatus;
import com.c1se16.bill.detail.BillDetail;
import com.c1se16.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "bill")
public class Bill {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "bill_paypal_id", unique = true)
    private String billPaypalId;

    @Column(name = "payment_link")
    private String paymentLink;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private BillStatus status;

    @Temporal(TemporalType.DATE)
    @Column(name = "created_date", updatable = false)
    @CreationTimestamp
    private Date createdDate;

    @Column(name = "total")
    private BigDecimal total;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "paid_date")
    private Date paidDate;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator", referencedColumnName = "id")
    private User creator;

    @JsonIgnore
    @OneToMany(mappedBy = "bill", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Fetch(FetchMode.SUBSELECT)
    private List<BillDetail> details;
}
