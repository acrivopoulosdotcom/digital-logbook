package com.example.backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ControllerAdvisor {
    @ExceptionHandler(EntryDoesNotExistException.class)
    private ResponseEntity<Object> handleException(EntryDoesNotExistException e) {
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
