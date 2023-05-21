package com.c1se16.auhority;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AuthorityRepository extends JpaRepository<Authority, String> {

    @Query("SELECT a FROM Authority a WHERE a.isDefault = true")
    List<Authority> findDefaultAuthority();
}