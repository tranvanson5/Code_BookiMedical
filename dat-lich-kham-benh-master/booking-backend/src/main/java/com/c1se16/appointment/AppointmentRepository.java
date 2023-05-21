package com.c1se16.appointment;

import com.c1se16.appointment.constant.AppointmentStatus;
import com.c1se16.appointment.request.AppointmentSearchRequest;
import com.c1se16.appointment.request.StatisticAppointmentRequest;
import com.c1se16.appointment.response.AppointmentSearchResponse;
import com.c1se16.appointment.response.OverallAppointment;
import com.c1se16.core.response.ChartResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface AppointmentRepository extends JpaRepository<Appointment, String> {

    @Query("SELECT a.id as id, a.fullName as fullName," +
            "  a.age as age, a.phone as phone, a.gender as gender," +
            "  a.time as time, a.status as status, a.department.address as departmentName," +
            "  a.specialist.name as specialistName, a.reasonOfPatient as reasonOfPatient," +
            "  a.reasonOfManager as reasonOfManager, a.cancelDate as cancelDate," +
            "  a.approvedDate as approvedDate, a.doneDate as doneDate " +
            " FROM Appointment a" +
            " LEFT JOIN a.specialist" +
            " WHERE true" +
            " AND (:#{#request.username} IS NULL OR a.patient.username = :#{#request.username})" +
            " AND (:status IS NULL OR :status = a.status)" +
            " AND (:#{#request.time} IS NULL OR a.time = :#{#request.time})" +
            " AND (:#{#request.fullName} IS NULL OR (a.fullName LIKE %:#{#request.fullName}% OR a.patient.username LIKE %:#{#request.fullName}%))" +
            " AND (:#{#request.departmentIds} IS NULL OR a.department.code IN :#{#request.departmentIds})" +
            " ORDER BY a.createdDate DESC")
    Page<AppointmentSearchResponse> getMyAppointment(AppointmentSearchRequest request, AppointmentStatus status, Pageable pageable);

    @Query("SELECT" +
            " SUM(IF(a.status = 'PENDING', 1, 0)) pending," +
            " SUM(IF(a.status = 'CANCEL', 1, 0)) cancel," +
            " SUM(IF(a.status = 'DONE', 1, 0)) done," +
            " SUM(IF(a.status = 'APPROVED', 1, 0)) approved" +
            " FROM Appointment a")
    Map<String, Object> getOverallAppointment();

    @Query(value = """
        SELECT 
            MONTH(a.CANCEL_DATE) name,
            COUNT(1) value
        FROM APPOINTMENT a
        WHERE YEAR(a.CANCEL_DATE) = :#{#req.year}
            AND (:#{#req.departmentId} IS NULL OR a.department_id = :#{#req.departmentId})
        GROUP BY name
    """, nativeQuery = true)
    List<ChartResponse> statisticCancelAppointment(StatisticAppointmentRequest req);

    @Query(value = """
        SELECT 
            MONTH(a.DONE_DATE) name,
            COUNT(1) value
        FROM APPOINTMENT a
        WHERE YEAR(a.DONE_DATE) = :#{#req.year}
            AND (:#{#req.departmentId} IS NULL OR a.department_id = :#{#req.departmentId})
        GROUP BY name
    """, nativeQuery = true)
    List<ChartResponse> statisticDoneAppointment(StatisticAppointmentRequest req);

    @Query(value = """
        SELECT 
            MONTH(a.CREATED_DATE) name,
            COUNT(1) value
        FROM APPOINTMENT a
        WHERE YEAR(a.CREATED_DATE) = :#{#req.year}
            AND (:#{#req.departmentId} IS NULL OR a.department_id = :#{#req.departmentId})
        GROUP BY name
    """, nativeQuery = true)
    List<ChartResponse> statisticPendingAppointment(StatisticAppointmentRequest req);

    @Query(value = """
        SELECT 
            MONTH(a.APPROVED_DATE) name,
            COUNT(1) value
        FROM APPOINTMENT a
        WHERE YEAR(a.APPROVED_DATE) = :#{#req.year}
            AND (:#{#req.departmentId} IS NULL OR a.department_id = :#{#req.departmentId})
        GROUP BY name
    """, nativeQuery = true)
    List<ChartResponse> statisticApprovedAppointment(StatisticAppointmentRequest req);
}