package com.c1se16.appointment;

import com.c1se16.appointment.request.StatisticAppointmentRequest;
import com.c1se16.appointment.response.OverallAppointment;
import com.c1se16.core.response.ChartResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/appointments")
@RequiredArgsConstructor
public class AdminAppointmentController {

    private final AppointmentService appointmentService;

    @GetMapping("/statistic/overall")
    public OverallAppointment getOverallAppointment() {
        return this.appointmentService.getOverallAppointment();
    }

    @PostMapping("/statistic")
    public List<ChartResponse> statisticAppointment(@RequestBody StatisticAppointmentRequest req) {
        return this.appointmentService.statisticAppointment(req);
    }

    @GetMapping(value = "/approve", params = {"appointmentId", "specialistId"})
    public void approveAppointment(@RequestParam String appointmentId, @RequestParam Integer specialistId) {
        this.appointmentService.approveAppointment(appointmentId, specialistId);
    }

    @GetMapping(value = "/finish", params = {"appointmentId"})
    public void finishAppointment(@RequestParam String appointmentId) {
        this.appointmentService.finishAppointment(appointmentId);
    }
}
