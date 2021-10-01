package com.devsuperior.dscatalog.repositories;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;

import com.devsuperior.dscatalog.entities.Product;
import com.devsuperior.dscatalog.factories.Factory;

@DataJpaTest
public class ProductRepositoryTests {

	private Long existingId;
	private Long notExistingId;	
	private Integer countTotalProducts;
	
	@BeforeEach
	private void setUp() {
		existingId = 1L;
		notExistingId = 1000L;	
		countTotalProducts = 25;
	}
	
	@Autowired
	private ProductRepository repositoryProduct;

	@Test
	public void deleteShouldDeleteProductWhenIdExists() {
		
		repositoryProduct.deleteById(existingId);
		Optional<Product> result = repositoryProduct.findById(existingId); 
		Assertions.assertFalse(result.isPresent());
	}
	
	@Test
	public void deleteShouldThrowEmptyResultDataAccessExceptionWhenNotFoundIdProduct() {
		
		Assertions.assertThrows(EmptyResultDataAccessException.class, ()->{
			repositoryProduct.deleteById(notExistingId);			
		});
	}

	@Test
	public void saveShouldPersistWithAutoincrementWhenIdIsNull() {
		
		Product product = Factory.createProduct();
		product.setId(null);
		product = repositoryProduct.save(product);
		Assertions.assertNotNull(product.getId());
		Assertions.assertEquals(countTotalProducts+1, product.getId());
	}
	
	@Test
	public void findByIdShouldReturnProductNotEmptyWhenIdExists() {

		Optional<Product> result = repositoryProduct.findById(existingId); 
		Assertions.assertTrue(result.isPresent());
	}

	@Test
	public void findByIdShouldReturnProductEmptyWhenIdNotExists() {

		Optional<Product> result = repositoryProduct.findById(notExistingId); 
		Assertions.assertFalse(result.isPresent());
	}

}
