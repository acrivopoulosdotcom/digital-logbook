package com.example.backend;

public class EntryAlreadyExistsException extends Exception {
    public EntryAlreadyExistsException(String message) {
        super(message);
    }
    public EntryAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }
}
