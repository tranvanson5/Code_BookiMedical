package com.c1se16.exception;

import com.c1se16.token.TokenRepository;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @Autowired
    private TokenRepository tokenRepository;

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> handleInternalException(Exception ex) {
        log.error(ex.getMessage(), ex);
        return new HashMap<>(){{
            put("messages", List.of(ex.getMessage()));
        }};
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> handleValidateException(MethodArgumentNotValidException ex) {
        log.error(ex.getMessage(), ex);
        List<String> messages = ex.getBindingResult().getFieldErrors()
                .stream()
                .map(FieldError::getDefaultMessage)
                .toList();
        return new HashMap<>() {{
            put("messages", messages);
        }};
    }

    @ExceptionHandler(DisabledException.class)
    @ResponseStatus(HttpStatus.LOCKED)
    public Map<String, Object> handleDisabledUser(DisabledException ex) {
        log.error(ex.getMessage(), ex);
        return new HashMap<>() {{
            put("messages", List.of("Tài khoản đã bị khóa, liên hệ admin để được hỗ trợ!"));
        }};
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    public Map<String, Object> handleIllegalArgumentException(IllegalArgumentException ex) {
        log.error(ex.getMessage(), ex);
        return new HashMap<>() {{
            put("messages", List.of(ex.getMessage()));
        }};
    }

    @ExceptionHandler(ExpiredJwtException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public Map<String, Object> handleExpiredJwt(ExpiredJwtException ex, HttpServletRequest request) {
        log.error(ex.getMessage(), ex);
        String jwt = request.getHeader("Authorization");
        this.tokenRepository.deleteByJwt(jwt.replace("Bearer ", ""));
        return new HashMap<>() {{
            put("messages", List.of("Đã hết thời hạn đăng nhập."));
        }};
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> handleBadCredentialsException(BadCredentialsException ex) {
        return new HashMap<>(){{
            put("messages", List.of("Tài khoản hoặc mật khẩu không chính xác."));
        }};
    }
}
