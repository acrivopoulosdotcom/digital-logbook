package com.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MongoUserDetailsService {

    private final MongoUserRepository userRepository;
    private final IdService idService;

    public List<MongoUser> getAllMongoUser() {return userRepository.findAll();}

    public MongoUser saveUser(MongoUser user) {
        if (userRepository.findMongoUserByEmail(user.getEmail()).equals(user.getEmail())) {
            throw new IllegalArgumentException("Email already taken");
        }
        return userRepository.save(user.withId(idService.generateID()));
    }

    public MongoUser updateUser(String id, MongoUser user) throws UserDoesNotExistException, UserAlreadyExistException {
        boolean containsNotUser = !userRepository.existsById(id);
        if (containsNotUser) {
            throw new UserDoesNotExistException("User does not exist.");
        }

        return userRepository.save(user);

    }
}