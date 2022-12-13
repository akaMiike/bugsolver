package com.bugsolver.exception.answer;

import com.bugsolver.exception.BugSolverException;
import org.springframework.http.HttpStatus;

public class AnswerNotFoundException extends BugSolverException {

    private static final String MESSAGE_KEY = "answer.not-found";

    public AnswerNotFoundException() {
        super(HttpStatus.NOT_FOUND, MESSAGE_KEY);
    }
}
