package com.devsuperior.dscatalog.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.entities.Product;
import com.devsuperior.dscatalog.repositories.ProductRepository;
import com.devsuperior.dscatalog.services.exceptions.DataBaseException;
import com.devsuperior.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class ProductService {

	@Autowired
	ProductRepository repositoryProduct;

	@Transactional(readOnly = true)
	public List<ProductDTO> findAll() {
		return repositoryProduct.findAll().stream().map(x -> new ProductDTO(x)).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public ProductDTO findById(Long id) {
		Optional<Product> obj = repositoryProduct.findById(id);
		return (new ProductDTO(obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found")), obj.get().getCategories()));
	}

	@Transactional
	public ProductDTO insert(ProductDTO dto) {
		Product obj = new Product(null, dto.getName(), dto.getDescription(), dto.getPrice(), dto.getImgUrl(), dto.getDate());
		obj = repositoryProduct.save(obj);
		return new ProductDTO(obj);
	}

	@Transactional
	public ProductDTO update(Long id, ProductDTO dto) {
		try {
			Product obj = repositoryProduct.getById(id);
			obj.setName(dto.getName());
			obj.setDescription(dto.getDescription());
			obj.setPrice(dto.getPrice());
			obj.setImgUrl(dto.getImgUrl());
			obj.setDate(dto.getDate());
			obj = repositoryProduct.save(obj);
			dto.setId(obj.getId());
			return dto;
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}

	public void delete(Long id) {
		try {
			repositoryProduct.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		} catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integrity violation. Id " + id);
		}
	}

	@Transactional(readOnly = true)
	public Page<ProductDTO> findAllPaged(PageRequest pageRequest) {
		Page<Product> list = repositoryProduct.findAll(pageRequest);
		
		return list.map(x -> new ProductDTO(x));
	}
}
