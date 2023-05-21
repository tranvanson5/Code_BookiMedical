package com.c1se16.cart;

import com.c1se16.cart.request.SearchCartRequest;
import com.c1se16.product.Product;
import com.c1se16.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    @Query(
        value = """
            SELECT c FROM Cart c JOIN FETCH c.product
            WHERE true
            AND (:#{#request.userId} IS NULL OR :#{#request.userId} = c.user.id)
            ORDER BY c.createdDate DESC
        """,
        countQuery = """
            SELECT count(c) FROM Cart c
            WHERE true
            AND (:#{#request.userId} IS NULL OR :#{#request.userId} = c.user.id)
            ORDER BY c.createdDate DESC
        """
    )
    Page<Cart> searchCart(SearchCartRequest request, Pageable pageable);

    @Query("SELECT c FROM Cart c JOIN FETCH c.product WHERE c.id IN ?1")
    List<Cart> findByIds(List<Long> ids);

    Optional<Cart> findByUserAndProduct(User user, Product product);
}