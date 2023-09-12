package com.example.backend;

public class EntryDoesNotExistException extends Exception {

    public EntryDoesNotExistException(String message) {
        super(message);
    }

    public EntryDoesNotExistException(String message, Throwable cause) {
        super(message, cause);
    }
}
