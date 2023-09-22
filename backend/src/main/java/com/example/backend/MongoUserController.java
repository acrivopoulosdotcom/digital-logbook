package com.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class MongoUserController {

    private final MongoUserDetailsService userDetailsService;

    @PostMapping("/register")
    public String addUser(@RequestBody MongoUser user) {return userDetailsService.saveUser(user).getUsername();}

    @PostMapping("/login")
    public String login() {return SecurityContextHolder.getContext().getAuthentication().getName();}

    @PutMapping("/update/{id}")
    public MongoUser updateUser(@PathVariable String id, @RequestBody MongoUser user) throws UserDoesNotExistException {
        return userDetailsService.updateUser(id, user);
    }

    @GetMapping("/currentUser/{username}")
    public String getUserId(@PathVariable String username) throws UsernameNotFoundException {
        return userDetailsService.getUserId(username);
    }

}
