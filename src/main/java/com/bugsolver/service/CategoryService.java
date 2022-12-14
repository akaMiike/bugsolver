package com.bugsolver.service;

import com.bugsolver.entity.Category;
import com.bugsolver.exception.category.CategoryNotFoundException;
import com.bugsolver.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public Category save(Category category){
        return categoryRepository.save(category);
    }

    public Category update(Long id, Category category){
        Category oldCategory = findById(id);

        category.setId(id);
        return categoryRepository.save(category);
    }

    public Category findById(Long id){
        return categoryRepository.findById(id).orElseThrow(
                () -> new CategoryNotFoundException()
        );
    }

    public List<Category> findAll(){
        return categoryRepository.findAll();
    }
}
