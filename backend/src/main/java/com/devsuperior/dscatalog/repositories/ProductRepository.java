package com.devsuperior.dscatalog.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.dscatalog.entities.Category;
//import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

	// JPQL passando id de categoria. Só funciona no Postgre com typo Integer. 
	// Não funciona com Long nem com Category.
	@EntityGraph(
		    type = EntityGraphType.FETCH,
		    attributePaths = {
		      "categories"
		    }
		  )	
	@Query("SELECT DISTINCT obj "
			+ "FROM Product obj INNER JOIN obj.categories cats "
			+ "WHERE (:categoryId = 0 OR :categoryId IN cats) "
			+ "  AND (UPPER(obj.name) LIKE UPPER(CONCAT('%',:name,'%')))")
	Page<Product> findAllPagedFilter(Pageable pageable, Integer categoryId, String name);

	// JPQL. Nélio explicou que para funcionar devemos passar uma lista de categorias.
	@EntityGraph(
		    type = EntityGraphType.FETCH,
		    attributePaths = {
		      "categories"
		    }
		  )	
	@Query("SELECT DISTINCT obj "
			+ "FROM Product obj INNER JOIN obj.categories cats "
			+ "WHERE (COALESCE(:categories) IS NULL OR :categories IN cats) "
			+ "  AND (UPPER(obj.name) LIKE UPPER(CONCAT('%',:name,'%')))")
	Page<Product> findAllPagedFilter2(Pageable pageable, List<Category> categories, String name);

	// Native Query. Não suporta o ad-hoc EntityGraph.
	@Query(nativeQuery = true, value = "SELECT distinct p.*, categories.* "
			+ "FROM tb_product p, tb_category categories, tb_product_category pc "
			+ "WHERE p.id = pc.product_id "
			+ "  AND categories.id = pc.category_id",
			countQuery = "SELECT count(distinct p.id) "
					+ "FROM tb_product p, tb_category categories, tb_product_category pc "
					+ "WHERE p.id = pc.product_id "
					+ "  AND categories.id = pc.category_id"
			)
	Page<Product> findNativeQuery(Pageable pageable);
}
