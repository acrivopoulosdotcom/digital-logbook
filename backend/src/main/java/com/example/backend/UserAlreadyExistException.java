package com.example.backend;

public class UserAlreadyExistException extends Exception {
    public UserAlreadyExistException (String message) {super(message);}

    public UserAlreadyExistException (String message, Throwable cause) {super(message, cause);}
}
