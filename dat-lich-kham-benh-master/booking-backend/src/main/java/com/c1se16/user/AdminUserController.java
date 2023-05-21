package com.c1se16.user;

import com.c1se16.core.request.PagingRequest;
import com.c1se16.core.response.ChartResponse;
import com.c1se16.core.response.PagingResponse;
import com.c1se16.user.request.GetHisChangeStatusReq;
import com.c1se16.user.request.SignUpAdminRequest;
import com.c1se16.user.request.SignUpRequest;
import com.c1se16.user.request.UserSearchRequest;
import com.c1se16.user.response.HisChangeStatusResponse;
import com.c1se16.user.response.OverallUser;
import com.c1se16.user.response.UserSearchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/users")
public class AdminUserController {

    private final UserService userService;

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public void createAdminUser(@RequestBody @Validated SignUpAdminRequest req) {
        this.userService.signUpAdmin(req);
    }

    @GetMapping("/overall")
    @PreAuthorize("hasAuthority('ADMIN')")
    public OverallUser getOverallUser() {
        return this.userService.getOverallUser();
    }

    @GetMapping(value = "/statistic/change-status", params = {"year", "status"})
    public List<ChartResponse> statisticChangeStatusUsers(@RequestParam int year, @RequestParam int status) {
        return this.userService.getStatisticChangeStatusUser(year, status);
    }

    @PostMapping(value = "/statistic/his-change-status")
    public PagingResponse<HisChangeStatusResponse> getHisChangeStatus(@RequestBody @Validated PagingRequest<GetHisChangeStatusReq> request) {
        return this.userService.getHisChangeStatus(request);
    }

    @PostMapping("/search")
    @PreAuthorize("hasAuthority('ADMIN')")
    public PagingResponse<UserSearchResponse> searchUser(@RequestBody @Validated PagingRequest<UserSearchRequest> request) {
        return this.userService.searchUser(request);
    }

    @GetMapping("/managers")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<UserSearchResponse> getManager() {
        return this.userService.getManagers();
    }

    @GetMapping(value = "/active", params = {"userId"})
    @PreAuthorize("hasAuthority('ADMIN')")
    public void activeUser(@RequestParam Long userId) {
        this.userService.activeUser(userId);
    }

    @GetMapping(value = "/in-active", params = {"userId"})
    @PreAuthorize("hasAuthority('ADMIN')")
    public void blockUser(@RequestParam Long userId) {
        this.userService.blockUser(userId);
    }
}
