package com.c1se16.otp;

import com.c1se16.core.utils.RandomUtil;
import com.c1se16.email.EmailDTO;
import com.c1se16.email.EmailService;
import com.c1se16.email.constant.EmailTemplate;
import com.c1se16.token.TokenRepository;
import com.c1se16.user.User;
import com.c1se16.user.UserRepository;
import com.c1se16.otp.request.ChangePasswordOtpRequest;
import com.c1se16.otp.request.ConfirmOtpRequest;
import com.c1se16.otp.request.ForgotPasswordRequest;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final OtpConfig otpConfig;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final TokenRepository tokenRepository;

    public void forgotPassword(ForgotPasswordRequest request) throws MessagingException {
        User user = this.getUserByUsernameAndEmail(request.getUsername(), request.getEmail());
        String otp = RandomUtil.randomNumberWithLength(this.otpConfig.getLength());
        user.setOtp(this.passwordEncoder.encode(otp));
        user.setOtpExpireDate(new Date(System.currentTimeMillis() + this.otpConfig.getExpireTime()));
        EmailDTO emailDTO = EmailDTO.builder()
                .to(new String[] {user.getEmail()})
                .template(EmailTemplate.FORGOT_PASSWORD)
                .data(Map.of("header", user.getFullName(), "otp", otp))
                .build();
        this.emailService.asyncSend(emailDTO);
        this.userRepository.save(user);
    }

    public void confirmOtp(ConfirmOtpRequest request) {
        User user = this.getUserByUsernameAndEmail(request.getUsername(), request.getEmail());

        if (user.getOtpExpireDate().before(new Date())) {
            throw new IllegalArgumentException("OTP đã hết hạn");
        }

        boolean matches = this.passwordEncoder.matches(request.getOtp(), user.getOtp());
        if (!matches) {
            throw new IllegalArgumentException("OTP không chính xác");
        }
    }

    @Transactional
    public void changePasswordWithOtp(ChangePasswordOtpRequest request) {
        User user = this.getUserByUsernameAndEmail(request.getUsername(), request.getEmail());
        this.confirmOtp(request);
        user.setPassword(this.passwordEncoder.encode(request.getNewPassword()));
        user.setOtpExpireDate(null);
        user.setOtp(null);
        this.userRepository.save(user);
        this.tokenRepository.deleteByUserId(user.getId());
    }

    private User getUserByUsernameAndEmail(String username, String email) {
        User user = this.userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy username: " + username));
        if (!email.equals(user.getEmail())) {
            throw new IllegalArgumentException("Không tim thấy email: " + email);
        }
        return user;
    }
}