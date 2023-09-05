package com.example.backend;

public class LogEntryAlreadyExistsException extends Exception {
    public LogEntryAlreadyExistsException(String message) {
        super(message);
    }

    public LogEntryAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }
}
