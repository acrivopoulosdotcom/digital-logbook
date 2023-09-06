package com.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class MongoUserController {

    private final MongoUserDetailsService userDetailsService;

    @PostMapping("/register")
    public MongoUser addUser(@RequestBody MongoUser user) {return userDetailsService.saveUser(user);}

    @PostMapping("/login")
    public String login(@RequestBody MongoUser user) {return "es hat geklappt - keine Security vorhanden.";}

    @PutMapping("/update/{id}")
    public MongoUser updateUser(@PathVariable String id, @RequestBody MongoUser user) throws UserDoesNotExistException, UserAlreadyExistException {
        return userDetailsService.updateUser(id, user);
    }

}
