package com.backend.Backend;

import com.backend.Backend.models.UserDetails;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<UserDetails,String> {
    Optional<UserDetails> findByEmail(String email);
}
