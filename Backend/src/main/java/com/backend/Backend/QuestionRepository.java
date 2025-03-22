package com.backend.Backend;


import org.springframework.data.mongodb.repository.MongoRepository;
import com.backend.Backend.models.Question;

public interface QuestionRepository extends MongoRepository<Question,String> {

}
