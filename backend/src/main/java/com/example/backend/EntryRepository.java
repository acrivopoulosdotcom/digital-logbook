package com.example.backend;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface EntryRepository extends MongoRepository<Entry, String> {
    boolean existsById(String id);

    List<Entry> findAllByUserIdAndFormattedDate(String userId, String formattedDate);

    List<Entry> findAllByUserIdAndAndLabel(String userId, String label);

}
