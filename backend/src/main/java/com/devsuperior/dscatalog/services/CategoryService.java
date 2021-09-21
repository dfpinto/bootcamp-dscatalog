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

import com.devsuperior.dscatalog.dto.CategoryDTO;
import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.repositories.CategoryRepository;
import com.devsuperior.dscatalog.services.exceptions.DataBaseException;
import com.devsuperior.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class CategoryService {

	@Autowired
	CategoryRepository repositoryCategory;

	@Transactional(readOnly = true)
	public List<CategoryDTO> findAll() {
		return repositoryCategory.findAll().stream().map(x -> new CategoryDTO(x)).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public CategoryDTO findById(Long id) {
		Optional<Category> obj = repositoryCategory.findById(id);
		return (new CategoryDTO(obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"))));
	}

	@Transactional
	public CategoryDTO insert(CategoryDTO dto) {
		Category cat = new Category(null, dto.getName());
		cat = repositoryCategory.save(cat);
		return new CategoryDTO(cat);
	}

	@Transactional
	public CategoryDTO update(Long id, CategoryDTO dto) {
		try {
			Category cat = repositoryCategory.getById(id);
			cat.setName(dto.getName());
			cat = repositoryCategory.save(cat);
			dto.setId(cat.getId());
			return dto;
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}

	public void delete(Long id) {
		try {
			repositoryCategory.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		} catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integrity violation. Id " + id);
		}
	}

	@Transactional(readOnly = true)
	public Page<CategoryDTO> findAllPaged(PageRequest pageRequest) {
		Page<Category> list = repositoryCategory.findAll(pageRequest);
		
		return list.map(x -> new CategoryDTO(x));
	}
}
