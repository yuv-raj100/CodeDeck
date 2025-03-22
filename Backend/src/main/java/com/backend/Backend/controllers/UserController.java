package com.backend.Backend.controllers;

import com.backend.Backend.UserRepository;
import com.backend.Backend.models.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.sql.SQLOutput;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST})
@RestController
public class UserController {

    @Autowired
    UserRepository repo;

    @GetMapping("/userdetails")
    public UserDetails getUserDetails(@RequestParam String email){
        Optional<UserDetails> userDetails = repo.findByEmail(email);
        return userDetails.orElse(null);
    }

    @PostMapping("/userdetails")
    public void saveUserDetails(@RequestBody UserDetails data){

        Optional<UserDetails> existingUser = repo.findByEmail(data.getEmail());

        if (existingUser.isPresent()) {
            UserDetails user = existingUser.get();
            System.out.println(data.getSolved());
            user.setSolved(data.getSolved());
            System.out.println(user.getSolved());
            repo.save(user);                // Save updated data
        } else {
            repo.save(data);                // Create new entry
        }
    }
}
