package com.example.backend;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Data
@AllArgsConstructor
@RestController
@RequestMapping("/api/entries")
public class EntryController {

    private final EntryService entryService;

    @GetMapping
    public List<Entry> getAllEntries() {
        return entryService.getAllEntries();
    }

    @GetMapping("/getAllEntriesByUserIdAndSelectedDay/{userId}/{formattedDate}")
    public List<Entry> getAllEntriesByUserIdAndSelectedDay(@PathVariable String userId, @PathVariable String formattedDate) {
        return entryService.getAllEntriesByUserIdAndSelectedDay(userId, formattedDate);
    }

    @GetMapping("/getAllEntriesByLabel/{userId}/{selectedLabel}")
    public List<Entry> getAllEntriesByUserIdAndSelectedLabel(@PathVariable String userId, @PathVariable String selectedLabel) {
        return entryService.getAllEntriesByUserIdAndLabel(userId, selectedLabel);
    }

    @PostMapping("/addEntry")
    public Entry addEntry(@RequestBody Entry entry) throws Exception {
        System.out.println("Received entry: " + entry);
            return entryService.addEntry(entry);
    }

    @PutMapping("/changeStatus/{id}")
    public Entry updateStatus(@PathVariable String id, @RequestBody Entry entry) throws Exception {
        System.out.println("Received entry: " + entry);
        return entryService.changeStatusById(id, entry);
    }

    @DeleteMapping("/deleteEntry/{id}")
    public void deleteEntryById(@PathVariable String id) throws Exception {
        entryService.deleteEntryById(id);
    }
}
