package com.example.backend;

public class UserDoesNotExistException extends Exception {
    public  UserDoesNotExistException(String message) {super(message);}

    public UserDoesNotExistException(String message, Throwable cause) {super(message, cause);}
}
