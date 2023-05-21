package com.c1se16.security;

import com.c1se16.security.jwt.JwtUtil;
import com.c1se16.security.jwt.request.JwtRequest;
import com.c1se16.security.jwt.response.JwtResponse;
import com.c1se16.token.Token;
import com.c1se16.token.TokenRepository;
import com.c1se16.user.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class SecurityController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final TokenRepository tokenRepository;

    @PostMapping("/login")
    public JwtResponse login(@RequestBody @Validated JwtRequest jwtRequest) {
        Authentication authentication = new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword());
        Authentication authenticate = this.authenticationManager.authenticate(authentication);
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        UserDTO principal = (UserDTO) authenticate.getPrincipal();
        JwtResponse jwtResponse = this.jwtUtil.generateToken(principal);
        this.tokenRepository.save(new Token(jwtResponse.getJwt(), jwtResponse.getPublicKey(), principal.getId()));
        return jwtResponse;
    }

    @PostMapping("/logout")
    public void logout(@RequestHeader("Authorization") String jwt) {
        this.tokenRepository.deleteByJwt(jwt.replace("Bearer ", ""));
    }
}
