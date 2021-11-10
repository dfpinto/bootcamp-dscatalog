package com.devsuperior.dscatalog.resources;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.services.ProductService;

@RestController
@RequestMapping(value = "/products")
public class ProductResource {

	@Autowired
	ProductService serviceProduct;
	
	@GetMapping
	public ResponseEntity<Page<ProductDTO>> findAllPagedFilter(Pageable pageable
			, @RequestParam(value = "categoryId", defaultValue = "0") Integer categoryId 
			, @RequestParam(value = "name", defaultValue = "") String name)
	{
		Page<ProductDTO> list = serviceProduct.findAllPagedFilter(pageable, categoryId, name.trim()); 
		
		return ResponseEntity.ok(list);
	}

	/*
	@GetMapping
	public ResponseEntity<Page<ProductDTO>> findAllPagedFilter2(Pageable pageable
			, @RequestParam(value = "categoryId", defaultValue = "0") Long categoryId 
			, @RequestParam(value = "name", defaultValue = "") String name)
	{
		Page<ProductDTO> list = serviceProduct.findAllPagedFilter2(pageable, categoryId, name.trim()); 
		
		return ResponseEntity.ok(list);
	}
	*/

	@GetMapping(value = "/nativequery")
	public ResponseEntity<Page<ProductDTO>> findNativeQuery(Pageable pageable){
		Page<ProductDTO> list = serviceProduct.findNativeQuery(pageable); 
		
		return ResponseEntity.ok(list);
		
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<ProductDTO> findById(@PathVariable Long id){
		ProductDTO dto = serviceProduct.findById(id); 
		
		return ResponseEntity.ok(dto);
	}

	@PostMapping
	public ResponseEntity<ProductDTO> insert(@Valid @RequestBody ProductDTO dto){
		dto = serviceProduct.insert(dto); 
		URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}").buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<ProductDTO> update(@PathVariable Long id,@Valid @RequestBody ProductDTO dto){
		dto = serviceProduct.update(id, dto); 
		
		return ResponseEntity.ok(dto);
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id){
		serviceProduct.delete(id); 
		
		return ResponseEntity.noContent().build();
	}
}
