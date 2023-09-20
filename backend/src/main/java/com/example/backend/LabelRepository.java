package com.example.backend;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LabelRepository extends MongoRepository<Label, String> {
    List<Label> findLabelsByUserId(String userId);

}
