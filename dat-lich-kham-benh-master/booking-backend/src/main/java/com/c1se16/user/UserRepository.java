package com.c1se16.user;

import com.c1se16.auhority.Authority;
import com.c1se16.user.request.UserSearchRequest;
import com.c1se16.user.response.OverallUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u join fetch u.authorities WHERE u.username = ?1")
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findByPhone(String phone);

    @Modifying
    @Query("UPDATE User u SET u.password = ?1 WHERE u.username = ?2")
    void updatePassword(String password, String username);

    List<User> findByAuthorities(Authority authority);

    @Query("SELECT u" +
            " FROM User u" +
            " WHERE true " +
            " AND (:#{#request.username} IS NULL OR (u.username LIKE %:#{#request.username}% OR u.fullName LIKE %:#{#request.username}))" +
            " AND (:#{#request.status} IS NULL OR u.active = :#{#request.status})" +
            " ORDER BY u.id DESC")
    Page<User> searchUser(UserSearchRequest request, Pageable pageable);

    @Query("""
        SELECT
            count(u) total,
            sum(if(u.active = true, 1, 0)) active,
            sum(if(u.active = false, 1, 0)) inactive
        FROM User u
    """)
    OverallUser getOverallUser();
}