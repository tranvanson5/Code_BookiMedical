package com.c1se16.product;

import com.c1se16.product.request.ProductSearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Map;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(
    value = """
        SELECT p FROM Product p JOIN FETCH p.creator
        WHERE true
        AND (:#{#request.codeName} IS NULL OR (p.name LIKE %:#{#request.codeName}% OR p.code LIKE %:#{#request.codeName}%))
        AND (:#{#request.status} IS NULL OR p.status = :#{#request.status})
        ORDER BY p.createdDate DESC
    """,
    countQuery = """
        SELECT count(p) FROM Product p
        WHERE true
        AND (:#{#request.codeName} IS NULL OR (p.name LIKE %:#{#request.codeName}% OR p.code LIKE %:#{#request.codeName}%))
        AND (:#{#request.status} IS NULL OR p.status = :#{#request.status})
        ORDER BY p.createdDate DESC
    """
   )
    Page<Product> searchProduct(ProductSearchRequest request, Pageable pageable);

    @Query(
        value = """
            SELECT
                i.id as uuid,
                i.product.id as id, i.product.code as code,
                i.product.name as name, i.product.price as price,
                i.product.shortDescription as shortDescription,
                i.product.fullDescription as fullDescription,
                i.product.status as status, i.product.avatar as avatar,
                i.quantity as quantity 
            FROM Item i
            WHERE i.owner.id = ?1
        """,
        nativeQuery = false)
    Page<Map<String, Object>> getMyProduct(Long userId, Pageable pageable);
}