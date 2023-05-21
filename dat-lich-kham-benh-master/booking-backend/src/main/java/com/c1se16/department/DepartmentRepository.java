package com.c1se16.department;

import com.c1se16.department.request.DepartmentSearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DepartmentRepository extends JpaRepository<Department, String> {

    @Query("SELECT d FROM Department d JOIN FETCH d.manager WHERE d.active = true")
    List<Department> findActiveDepartment();

    @Query("SELECT d FROM Department d WHERE d.manager.id = ?1 AND d.active = true")
    List<Department> findByUser(Long userID);

    @Query( value = """
                SELECT d FROM Department d
                JOIN FETCH d.manager
                WHERE true
                AND (:#{#req.address} IS NULL OR (d.address LIKE %:#{#req.address}% OR d.code LIKE %:#{#req.address}%))
                AND (:#{#req.status} IS NULL OR d.active = :#{#req.status})
                ORDER BY d.id DESC
            """,
            countQuery = """
                SELECT count(d) FROM Department d
                WHERE true
                AND (:#{#req.address} IS NULL OR (d.address LIKE %:#{#req.address}% OR d.code LIKE %:#{#req.address}%))
                AND (:#{#req.status} IS NULL OR d.active = :#{#req.status})
                ORDER BY d.id DESC
            """
    )
    Page<Department> searchDepartment(DepartmentSearchRequest req, Pageable pageable);
}
