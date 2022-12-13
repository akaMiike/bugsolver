package com.bugsolver.service;

import com.bugsolver.entity.Answer;
import com.bugsolver.exception.answer.AnswerNotFoundException;
import com.bugsolver.repository.AnswerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;

    public void save(Answer answer){
        answerRepository.save(answer);
    }

    public void update(Long id, Answer answer){
        Answer oldAnswer = findById(id);

        answer.setId(id);
        answerRepository.save(answer);
    }

    public Answer findById(Long id){
        return answerRepository.findById(id).orElseThrow(
                () -> new AnswerNotFoundException()
        );
    }

    public List<Answer> findAll(){
        return answerRepository.findAll();
    }

    public void delete(Answer answer){
        answerRepository.delete(answer);
    }
}
