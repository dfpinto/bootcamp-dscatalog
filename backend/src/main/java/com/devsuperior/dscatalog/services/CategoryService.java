package com.devsuperior.dscatalog.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.dto.CategoryDTO;
import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.repositories.CategoryRepository;
import com.devsuperior.dscatalog.services.exceptions.EntityNotFoundException;

@Service
public class CategoryService {

	@Autowired
	CategoryRepository repositoryCategory;
	
	@Transactional(readOnly = true)
	public List<CategoryDTO> findAll(){
		return repositoryCategory.findAll().stream().map(x->new CategoryDTO(x)).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public CategoryDTO findById(Long id) {
		Optional<Category> obj = repositoryCategory.findById(id);
		return (new CategoryDTO(obj.orElseThrow(()->new EntityNotFoundException("Entity not found"))));
	}

	@Transactional
	public CategoryDTO insert(CategoryDTO dto) {
		Category cat = new Category(null, dto.getName());
		cat = repositoryCategory.save(cat);
		return new CategoryDTO(cat);
	}
}
