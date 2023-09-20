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

    @GetMapping("/getAllEntriesByDate/{userId}/{formattedDate}")
    public List<Entry> getAllEntriesByDate(@PathVariable String userId, @PathVariable String formattedDate) {
        System.out.println("AllEntriesBySelectedDay : " + entryService.getAllEntriesByUserIdAndSelectedDay(userId, formattedDate));
        return entryService.getAllEntriesByUserIdAndSelectedDay(userId, formattedDate);
    }

    @GetMapping("/getAllEntriesByLabel/{userId}/{selectedLabel}")
    public List<Entry> getAllEntriesByLabel(@PathVariable String userId, @PathVariable String selectedLabel) {
        return entryService.getAllEntriesByUserIdAndLabel(userId, selectedLabel);
    }

    @GetMapping("/getAllEntriesByStatus/{userId}/{selectedStatus}")
    public List<Entry> getAllEntriesByStatus(@PathVariable String userId, @PathVariable String selectedStatus) {
        return entryService.getAllEntriesByUserIdAndSelectedStatus(userId, selectedStatus);
    }

    @GetMapping("/getAllEntriesByStatusAndFormattedDate/{userId}/{status}/{formattedDate}")
    public List<Entry> getAllEntriesByUserIdAndStatusAndFormattedDate(@PathVariable String userId, @PathVariable String status, @PathVariable String formattedDate) {
        return entryService.getAllEntriesByUserIdAndStatusAndFormattedDate(userId, status, formattedDate);
    }

    @PostMapping("/addEntry")
    public Entry addEntry(@RequestBody Entry entry) {
        System.out.println("Received entry: " + entry);
            return entryService.addEntry(entry);
    }

    @PutMapping("/changeStatus/{id}")
    public Entry updateStatus(@PathVariable String id, @RequestBody Entry entry) {
        System.out.println("Received entry: " + entry);
        return entryService.changeStatusById(id, entry);
    }

    @PutMapping("/editEntry/{id}")
    public Entry updateEntry(@PathVariable String id, @RequestBody Entry entry) throws EntryDoesNotExistException {
        System.out.println("Received entry: " + entry);
        return entryService.updateEntry(id, entry);
    }

    @DeleteMapping("/deleteEntry/{id}")
    public void deleteEntryById(@PathVariable String id) throws Exception {
        entryService.deleteEntryById(id);
    }
}
