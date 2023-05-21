package com.c1se16.bill;

import com.c1se16.bill.request.SearchBillRequest;
import com.c1se16.core.response.ChartResponse;
import com.c1se16.product.response.StatisticProduct;
import jakarta.persistence.Tuple;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BillRepository extends JpaRepository<Bill, String> {

    @Query(
        value =
            "SELECT b FROM Bill b JOIN FETCH b.creator" +
            " WHERE true" +
            "  AND (:#{#req.userId} IS NULL OR :#{#req.userId} = b.creator.id)" +
            "  AND (:#{#req.idOrName} IS NULL OR (b.id = :#{#req.idOrName} OR b.creator.fullName LIKE %:#{#req.idOrName}%))" +
            "  AND (:#{#req.createdDate} IS NULL OR b.createdDate = :#{#req.createdDate})" +
            " ORDER BY b.createdDate DESC",
        countQuery =
            "SELECT count(b) FROM Bill b" +
            " WHERE true" +
            "  AND (:#{#req.userId} IS NULL OR :#{#req.userId} = b.creator.id)" +
            "  AND (:#{#req.idOrName} IS NULL OR (b.id = :#{#req.idOrName} OR b.creator.fullName LIKE %:#{#req.idOrName}%))"+
            "  AND (:#{#req.createdDate} IS NULL OR b.createdDate = :#{#req.createdDate})"
    )
    Page<Bill> searchBill(SearchBillRequest req, Pageable pageable);

    @Query("SELECT b FROM Bill b" +
            " JOIN FETCH b.details" +
            " JOIN FETCH b.details.product" +
            " WHERE b.id = ?1")
    Optional<Bill> findBillDetail(String billId);

    @Query(value = "SELECT " +
            "  YEAR(b.PAID_DATE) year," +
            "  MONTH(b.PAID_DATE) month," +
            "  SUM(b.total) total" +
            " FROM BILL b" +
            " WHERE b.PAID_DATE IS NOT NULL" +
            " GROUP BY year, month", nativeQuery = true)
    List<Tuple> statisticRevenueYearly();

    @Query(value = """
        SELECT 
            p.code name,
            COUNT(bd.QUANTITY) value
        FROM BILL b
        JOIN BILL_DETAIL bd ON bd.BILL_ID = b.ID
        JOIN PRODUCT p ON p.id = bd.PRODUCT_ID
        WHERE YEAR(b.PAID_DATE) = ?1
        GROUP BY bd.PRODUCT_ID
        LIMIT ?2
    """, nativeQuery = true)
    List<ChartResponse> getTopProduct(int year, int limit);

    @Query(
        value = """
            select
                p.name name,
                p.code code,
                sum(bd.quantity) quantity,
                sum(bd.price) revenue
           from bill b
           join bill_detail bd on bd.bill_id = b.id
           join product p on p.id = bd.product_id
           where year(b.paid_date) = ?1
           group by bd.product_id
           order by quantity desc
        """,
        nativeQuery = true
    )
    Page<StatisticProduct> statisticProduct(int year, Pageable pageable);

    @Query(value = """
        SELECT 
            MONTH(b.PAID_DATE) name,
            SUM(bd.price) value
        FROM BILL b
        JOIN BILL_DETAIL bd ON b.ID = bd.BILL_ID
        WHERE YEAR(b.PAID_DATE) = ?1
        GROUP BY name
    """, nativeQuery = true)
    List<ChartResponse> revenueMonthly(int year);

    @Query(value = """
        SELECT
            MONTH(b.PAID_DATE) month,
            p.code code,
            p.name name,
            SUM(bd.quantity) quantity,
            SUM(bd.price) revenue
        FROM BILL b
        JOIN BILL_DETAIL bd ON b.ID = bd.BILL_ID
        join product p ON p.id = bd.product_id
        where year(b.paid_date) = ?1
        GROUP BY month, bd.product_id
        ORDER BY quantity DESC   
     """, nativeQuery = true)
    List<Tuple> statisticRevenueProductMonthly(int year);
}