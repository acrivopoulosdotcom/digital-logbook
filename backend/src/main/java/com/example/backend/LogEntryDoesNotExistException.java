package com.example.backend;

public class LogEntryDoesNotExistException extends Exception {

    public LogEntryDoesNotExistException(String message) {
        super(message);
    }

    public LogEntryDoesNotExistException(String message, Throwable cause) {
        super(message, cause);
    }
}
