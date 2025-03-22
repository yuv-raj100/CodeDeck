package com.backend.Backend.controllers;

import com.backend.Backend.QuestionRepository;
import com.backend.Backend.models.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class PostController {

    @Autowired
    QuestionRepository repo;

    @GetMapping("/allquestions")
    public List<Question> getAllQuestions(){
        return repo.findAll();
    }
}

