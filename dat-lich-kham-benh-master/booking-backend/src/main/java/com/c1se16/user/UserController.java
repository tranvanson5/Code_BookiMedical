package com.c1se16.user;

import com.c1se16.user.request.ChangePasswordRequest;
import com.c1se16.user.request.SignUpRequest;
import com.c1se16.user.request.UserUpdateRequest;
import com.c1se16.user.response.SignUpResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public SignUpResponse signUp(@RequestBody @Validated SignUpRequest sign) {
        return this.userService.signUp(sign);
    }

    @PostMapping("/profile")
    public UserDTO updateProfile (@RequestBody @Validated UserUpdateRequest userUpdateRequest) {
        return this.userService.updateProfile(userUpdateRequest);
    }

    @PostMapping("/change-password")
    public void changePassword(@RequestBody @Validated ChangePasswordRequest request) {
        this.userService.changePassword(request);
    }
}
