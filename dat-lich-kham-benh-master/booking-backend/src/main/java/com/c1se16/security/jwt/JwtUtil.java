package com.c1se16.security.jwt;

import com.c1se16.auhority.Authority;
import com.c1se16.security.jwt.response.JwtResponse;
import com.c1se16.user.UserDTO;
import com.c1se16.user.constant.Gender;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.spec.X509EncodedKeySpec;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class JwtUtil {

    private final JwtConfig jwtConfig;
    private final ObjectMapper objectMapper;

    @SneakyThrows
    public KeyPair generateKey() {
        KeyPairGenerator instance = KeyPairGenerator.getInstance(this.jwtConfig.getKeyAlgorithm());
        instance.initialize(this.jwtConfig.getKeySize());
        return instance.generateKeyPair();
    }

    @SneakyThrows
    public Key parsePublicKey(byte[] bytes) {
        KeyFactory instance = KeyFactory.getInstance(this.jwtConfig.getKeyAlgorithm());
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(bytes);
        return instance.generatePublic(keySpec);
    }

    public JwtResponse generateToken(UserDTO userDetails) {
        KeyPair keyPair = this.generateKey();
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", userDetails.getId());
        claims.put("dob", userDetails.getDob());
        claims.put("address", userDetails.getFullName());
        claims.put("username", userDetails.getUsername());
        claims.put("phone", userDetails.getPhone());
        claims.put("address", userDetails.getAddress());
        claims.put("email", userDetails.getEmail());
        claims.put("active", userDetails.isActive());
        claims.put("gender", userDetails.getGender());
        claims.put("avatar", userDetails.getAvatar());
        claims.put("authorities", userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList());

        String jwt = this.generateToken(userDetails.getUsername(), claims, keyPair.getPrivate());
        return JwtResponse.builder()
                .jwt(jwt)
                .publicKey(keyPair.getPublic().getEncoded())
                .user(userDetails)
                .build();
    }

    public String generateToken(String username, Map<String, Object> claims, Key privateKey) {
        return Jwts.builder()
                .addClaims(claims)
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + this.jwtConfig.getExpireTime()))
                .setIssuedAt(new Date())
                .signWith(privateKey)
                .compact();
    }

    public String getUsernameFromToken(String token, Key publicKey) {
        return this.getFromToken(token, publicKey, Claims::getSubject);
    }

    public UserDTO getUserInfoFromToken(String token, Key publicKey) {
        return this.getFromToken(token, publicKey, claims -> {
            List<String> authorities = claims.get("authorities", List.class);
            List<Authority> list = authorities.stream()
                    .map(Authority::new)
                    .toList();
            return new UserDTO()
                    .setFullName(claims.get("fullName", String.class))
                    .setId(claims.get("id", Long.class))
                    .setActive(claims.get("active", Boolean.class))
                    .setEmail(claims.get("email", String.class))
                    .setDob(claims.get("dob", Date.class))
                    .setAddress(claims.get("address", String.class))
                    .setPhone(claims.get("phone", String.class))
                    .setAvatar(claims.get("avatar", String.class))
                    .setGender(Gender.valueOf(claims.get(("gender"), String.class)))
                    .setUsername(claims.get("username", String.class))
                    .setAuthorities(list);
        });
    }


    public boolean isExpired(String token, Key publicKey) {
        Date fromToken = this.getFromToken(token, publicKey, Claims::getExpiration);
        return new Date().after(fromToken);
    }

    private <T> T getFromToken(String token, Key publicKey, Function<Claims, T> handler) {
        return handler.apply(
            Jwts.parserBuilder()
                .setSigningKey(publicKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
        );
    }
}
