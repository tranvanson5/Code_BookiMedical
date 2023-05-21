package com.c1se16.bill.response;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

@Data
public class BillTree {

    private Integer key;
    private Integer parentKey;
    private BigDecimal revenue;
    private BigDecimal growth = new BigDecimal(0);
    private int rateGrowth;
    private List<BillTree> children;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BillTree billTree = (BillTree) o;
        return Objects.equals(key, billTree.key);
    }

    @Override
    public int hashCode() {
        return Objects.hash(key);
    }
}
