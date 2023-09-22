package com.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MongoUserDetailsService implements UserDetailsService {

    private final MongoUserRepository userRepository;
    private final IdService idService;

    @Override
    public UserDetails loadUserByUsername (String username) throws UsernameNotFoundException {
       MongoUser mongoUser = userRepository.findMongoUserByUsername(username)
               .orElseThrow(() -> new UsernameNotFoundException("User with username: " + username + " not found."));
        return new User(mongoUser.getUsername(), mongoUser.getPassword(), List.of());
    }

    public MongoUser saveUser(MongoUser user) {
        Optional<MongoUser> existingUserOption = userRepository.findMongoUserByUsername(user.getUsername());
        if (existingUserOption.isPresent()) {
            MongoUser existingUser = existingUserOption.get();
            if (existingUser.getUsername().equals(user.getUsername())) {
                throw new IllegalArgumentException("Benutzername bereits vergeben");
            }
        }

        PasswordEncoder encoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();

        userRepository.save(user.withId(idService.generateID()).withPassword(encoder.encode(user.getPassword())));
        return user;
    }

    public MongoUser updateUser(String id, MongoUser user) throws UserDoesNotExistException {
        boolean containsNotUser = !userRepository.existsById(id);
        if (containsNotUser) {
            throw new UserDoesNotExistException("User does not exist.");
        }

        return userRepository.save(user);

    }

//    public Map<String, String> getUserDetailsByUsername(String username) {
//        Optional<MongoUser> userOptional = userRepository.findMongoUserByUsername(username);
//        if (userOptional.isPresent()) {
//            MongoUser user = userOptional.get();
//            Map<String, String> userDetails = new HashMap<>();
//            userDetails.put("id", user.getId());
//            userDetails.put("username", user.getUsername());
//            return userDetails;
//        }
//        return null;
//
//    }

    public String getUserId(String username) throws UsernameNotFoundException {
        Optional<MongoUser> userOptional = userRepository.findMongoUserByUsername(username);
        if (userOptional.isPresent()) {
            MongoUser user = userOptional.get();
            return user.getId();
        }
        return null;
    }

}
