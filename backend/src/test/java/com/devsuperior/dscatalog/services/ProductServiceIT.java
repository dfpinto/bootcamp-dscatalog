package com.devsuperior.dscatalog.services;

import javax.transaction.Transactional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.repositories.ProductRepository;
import com.devsuperior.dscatalog.services.exceptions.ResourceNotFoundException;

@SpringBootTest
@Transactional
public class ProductServiceIT {

	@Autowired
	private ProductService productService;

	@Autowired
	private ProductRepository productRepository;

	private Long existingId;
	private Long nonExistingId;
	private Long countTotalProductDTO;

	@BeforeEach
	private void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = 1000L;
		countTotalProductDTO = 25L;
	}

	@Test
	public void deleteShouldReturnCountTotalProductDTOWhenIdExists() {
		productService.delete(existingId);
		Assertions.assertEquals(countTotalProductDTO - 1, productRepository.count());
	}

	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExists() {
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			productService.delete(nonExistingId);
		});
	}
	
	@Test
	public void findAllPagedShouldReturnPageProductDTO() {
		Page<ProductDTO> page = productService.findAllPaged(PageRequest.of(0, 10), 0);
		Assertions.assertFalse(page.isEmpty());
		Assertions.assertEquals(0, page.getNumber());
		Assertions.assertEquals(10, page.getSize());
		Assertions.assertEquals(countTotalProductDTO, page.getTotalElements());
	}

	@Test
	public void findAllPagedShouldReturnSortedPageWhenSortByName() {
		Page<ProductDTO> page = productService.findAllPaged(PageRequest.of(0, 10, Sort.by("name")), 0);
		Assertions.assertFalse(page.isEmpty());
		Assertions.assertEquals("Macbook Pro", page.getContent().get(0).getName());
		Assertions.assertEquals("PC Gamer", page.getContent().get(1).getName());
		Assertions.assertEquals("PC Gamer Alfa", page.getContent().get(2).getName());
	}
	
}
