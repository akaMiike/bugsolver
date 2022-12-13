package com.bugsolver.service;

import com.bugsolver.entity.Bug;
import com.bugsolver.exception.bug.BugNotFoundException;
import com.bugsolver.repository.BugRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BugService {

    private final BugRepository bugRepository;

    public void save(Bug bug){
        bugRepository.save(bug);
    }

    public void update(Long id, Bug bug){
        Bug oldBug = findById(id);

        bug.setId(id);
        bugRepository.save(bug);
    }

    public Bug findById(Long id){
        return bugRepository.findById(id).orElseThrow(
                () -> new BugNotFoundException()
        );
    }

    public List<Bug> findAll(){
        return bugRepository.findAll();
    }
}
