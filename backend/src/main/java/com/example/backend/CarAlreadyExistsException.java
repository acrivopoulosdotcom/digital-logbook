package com.example.backend;

public class CarAlreadyExistsException extends Exception {

    public CarAlreadyExistsException(String message) {
        super(message);
    }

    public CarAlreadyExistsException(String message, Throwable cause) { super(message,cause);}
}
