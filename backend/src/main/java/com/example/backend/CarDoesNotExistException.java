package com.example.backend;

public class CarDoesNotExistException extends Exception {

    public CarDoesNotExistException(String message) { super(message);}

    public CarDoesNotExistException(String message, Throwable cause) {
        super(message, cause);
    }

}
