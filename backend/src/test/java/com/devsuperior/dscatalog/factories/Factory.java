package com.devsuperior.dscatalog.factories;

import java.time.Instant;

import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.entities.Product;

public class Factory {

	public static Product createProduct() {
		Product product = new Product(1L, "Phone", "Good Phone", 800.0, "http://img.com/img.png", Instant.parse("2021-09-26T17:00:00Z") );
		product.getCategories().add(new Category(2L,"Eletronics") );
		return product;
	}

	public static ProductDTO createProductDTO() {
		Product product = createProduct();
		ProductDTO productDTO = new ProductDTO(product, product.getCategories()); 
		return productDTO;
	}

	public static Category createCategory() {
		return new Category(2L,"Eletronics");
	}

}
