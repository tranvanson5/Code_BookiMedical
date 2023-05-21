package com.c1se16.user.hischangestatus;

import com.c1se16.core.response.ChartResponse;
import com.c1se16.user.request.GetHisChangeStatusReq;
import com.c1se16.user.response.HisChangeStatusResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HisChangeStatusUserRepository extends JpaRepository<HisChangeStatusUser, Long> {

    @Query(value = """
        SELECT
            MONTH(h.UPDATE_DATE) name,
            COUNT(1) value
        FROM HIS_CHANGE_STATUS_USER h
        WHERE YEAR(h.UPDATE_DATE) = ?1 AND h.NEW_STATUS = ?2
        GROUP BY name;
    """, nativeQuery = true)
    List<ChartResponse> getStatisticUser(int year, int status);

    @Query(
        value = """
            SELECT 
                h.id id, h.updateDate updateDate,
                h.oldStatus oldStatus, h.newStatus newStatus,
                h.user.username username, h.updater.username updater
            FROM HisChangeStatusUser h
            WHERE 
                YEAR(h.updateDate) = :#{#req.year}
                AND (:#{#req.username} IS NULL OR h.user.username LIKE %:#{#req.username}%)
            ORDER BY h.updateDate ASC
        """
    )
    Page<HisChangeStatusResponse> getHisChangeStatusUser(GetHisChangeStatusReq req, Pageable pageable);
}