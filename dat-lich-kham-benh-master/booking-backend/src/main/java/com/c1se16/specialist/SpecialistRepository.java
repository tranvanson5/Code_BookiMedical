package com.c1se16.specialist;

import com.c1se16.specialist.request.SpecialistSearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SpecialistRepository extends JpaRepository<Specialist, Integer> {

    @Query("SELECT s FROM Specialist s WHERE s.active = true")
    List<Specialist> findActiveSpecialist();

    @Query("SELECT s FROM Specialist s" +
            " WHERE true" +
            "  AND (:#{#request.name} IS NULL OR s.name LIKE %:#{#request.name}%)" +
            "  AND (:#{#request.status} IS NULL OR s.active = :#{#request.status})" +
            "ORDER BY s.createdDate DESC")
    Page<Specialist> searchSpecialist(SpecialistSearchRequest request, Pageable pageable);
}