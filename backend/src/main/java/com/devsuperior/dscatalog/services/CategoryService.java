package com.devsuperior.dscatalog.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.dto.CategoryDTO;
import com.devsuperior.dscatalog.repositories.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	CategoryRepository repositoryCategory;
	
	@Transactional(readOnly = true)
	public List<CategoryDTO> findAll(){
		return repositoryCategory.findAll().stream().map(x->new CategoryDTO(x)).collect(Collectors.toList());
	}
}
