package com.c1se16.token;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {

    Optional<Token> findByJwt(String jwt);

    @Modifying
    @Transactional
    void deleteByJwt(String jwt);

    @Modifying
    void deleteByUserId(Long userId);
}