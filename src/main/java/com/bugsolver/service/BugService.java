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

    public Bug save(Bug bug){
        return bugRepository.save(bug);
    }

    public Bug update(Long id, Bug bug){
        Bug oldBug = findById(id);

        bug.setId(id);
        return bugRepository.save(bug);
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
