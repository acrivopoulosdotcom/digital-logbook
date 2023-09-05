package com.example.backend;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@Service
@AllArgsConstructor
public class LogEntryService {

    private LogEntryRepository logEntryRepository;

    public List<LogEntry> getAllLogEntries() {
        return logEntryRepository.findAll();
    }

    public LogEntry addLogEntry(LogEntry logEntry) throws LogEntryAlreadyExistsException {
        boolean containsLogEntry = logEntryRepository.existsById(logEntry.getId());
        if (containsLogEntry) {
            throw new LogEntryAlreadyExistsException("Id is already used");
        }
        return logEntryRepository.save(logEntry);
    }

    public LogEntry removeLogEntry(String id) throws LogEntryDoesNotExistException {
        boolean containsNotLogEntry = !logEntryRepository.existsById(id);

        if (containsNotLogEntry) {
            throw new LogEntryDoesNotExistException("LogEntry does not exists");
        }

        logEntryRepository.deleteById(id);
        return null;
    }

    public LogEntry updateLogEntry(String id, LogEntry logEntry) throws LogEntryDoesNotExistException {
        boolean containsNotLogEntry = !logEntryRepository.existsById(id);
        if (containsNotLogEntry) {
            throw new LogEntryDoesNotExistException("LogEntry does not exist");
        }
        return logEntryRepository.save(logEntry);
    }

    public LogEntry getLogEntryById(String id) throws LogEntryDoesNotExistException {
        boolean containsNotLogEntry = !logEntryRepository.existsById(id);
        if (containsNotLogEntry) {
            throw new LogEntryDoesNotExistException("LogEntry does not exists");
        }
        return logEntryRepository.findById(id).orElse(null);
    }

    public Set<String> getAllLogEntriesIds() {
        List<LogEntry> logEntries = logEntryRepository.findAll();
        return logEntries.stream().map(e -> e.getId()).collect(Collectors.toSet());

    }
}
