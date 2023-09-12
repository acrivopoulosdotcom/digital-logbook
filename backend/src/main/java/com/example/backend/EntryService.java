package com.example.backend;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@Service
@AllArgsConstructor
public class EntryService {

    private final EntryRepository entryRepository;
    private final IdService idService;

    public List<Entry> getAllEntries() {
        return entryRepository.findAll();
    }

    public Entry addEntry(Entry entry) {
        return entryRepository.save(entry.withId(idService.generateID()));
    }

    public Entry removeEntry(String id) throws EntryDoesNotExistException {
        boolean containsNotEntry = !entryRepository.existsById(id);

        if (containsNotEntry) {
            throw new EntryDoesNotExistException("Entry does not exists");
        }

        entryRepository.deleteById(id);
        return null;
    }

    public Entry updateEntry(String id, Entry entry) throws EntryDoesNotExistException {
        boolean containsNotEntry = !entryRepository.existsById(id);
        if (containsNotEntry) {
            throw new EntryDoesNotExistException("Entry does not exist");
        }
        return entryRepository.save(entry);
    }

    public Entry getEntryById(String id) throws EntryDoesNotExistException {
        boolean containsNotEntry = !entryRepository.existsById(id);
        if (containsNotEntry) {
            throw new EntryDoesNotExistException("Entry does not exists");
        }
        return entryRepository.findById(id).orElse(null);
    }

    public Set<String> getAllIds() {
        List<Entry> entries = entryRepository.findAll();
        return entries.stream().map(e -> e.getId()).collect(Collectors.toSet());
    }

    public List<Entry> getAllEntriesByUserIdAndSelectedDay(String userId, String formattedDate) {
        return entryRepository.findAllByUserIdAndFormattedDate(userId, formattedDate);
    }

    public List<Entry> getAllEntriesByUserIdAndLabel(String userId, String label) {
        return entryRepository.findAllByUserIdAndAndLabel(userId, label);
    }

    public Entry changeStatusById(String id, Entry updatedEntry) {
        Optional<Entry> optionalEntry = entryRepository.findById(id);

        if(optionalEntry.isPresent()) {
            Entry existingEntry = optionalEntry.get();

            existingEntry.setStatus(updatedEntry.getStatus());

            Entry savedEntry = entryRepository.save(existingEntry);

            return savedEntry;
        } else {
            return null;
        }
    }

    public void deleteEntryById(String id) {
        entryRepository.deleteById(id);
    }
}
