package com.example.backend;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Data
@AllArgsConstructor
@RestController
@RequestMapping("/api/logentries")
public class LogEntryController {

    LogEntryService logEntryService;

    @GetMapping
    public List<LogEntry> getAllLogEntries() {
        return logEntryService.getAllLogEntries();
    }

    @PostMapping
    public LogEntry addLogEntry(@RequestBody LogEntry logEntry) throws Exception {

        LogEntry addedLogEntry = logEntryService.addLogEntry(logEntry);
        return addedLogEntry;
    }

}
