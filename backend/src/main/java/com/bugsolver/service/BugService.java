package com.bugsolver.service;

import com.bugsolver.entity.Bug;
import com.bugsolver.entity.Category;
import com.bugsolver.exception.bug.BugNotFoundException;
import com.bugsolver.exception.category.CategoryNotFoundException;
import com.bugsolver.repository.BugRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BugService {

    private final BugRepository bugRepository;
    private final CategoryService categoryService;

    public Bug save(Bug bug){
        Set<Category> categories = bug.getCategories().stream()
                .map(c -> {
                    Category category;
                    if (c.getId() != null) category = categoryService.findById(c.getId());
                    else throw new CategoryNotFoundException();
                    return category;
                }).collect(Collectors.toSet());

        bug.setCategories(categories);
        return bugRepository.save(bug);

    }

    public Bug update(Long id, Bug bug){
        if(!bugRepository.existsById(id)){
            throw new BugNotFoundException();
        }

        bug.setId(id);
        return bugRepository.save(bug);
    }

    public Bug findById(Long id){
        return bugRepository.findById(id).orElseThrow(
                () -> new BugNotFoundException()
        );
    }

    public void deleteById(Long id){
        if(!bugRepository.existsById(id)){
            throw new BugNotFoundException();
        }

        bugRepository.deleteById(id);
    }

    public Boolean existsById(Long id){
        return bugRepository.existsById(id);
    }

    public List<Bug> findAll(){
        return bugRepository.findAll();
    }

    public Page<Bug> findAll(Pageable pageable){
        return bugRepository.findAll(pageable);
    }

    public Page<Bug> findBugsByUserId(Pageable pageable, Long id){
        return bugRepository.findBugsByUserId(pageable, id);
    }

    public Page<Bug> findBugsByCategories(Pageable pageable, Set<String> categories){
        if(categories.isEmpty()){
            return bugRepository.findAll(pageable);
        }
        
        return bugRepository.findBugsByCategories(pageable, categories);
    }
}
