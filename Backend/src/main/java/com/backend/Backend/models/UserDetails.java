package com.backend.Backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "UserDetails")
public class UserDetails {
    @Id  // Ensure ID field is present
    private String id;
    private String userName;
    private String email;
    private List<SolvedQuestion> solved;

    public UserDetails(String email, List<SolvedQuestion> solved, String userName) {
        this.email = email;
        this.solved = solved;
        this.userName = userName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<SolvedQuestion> getSolved() {
        return solved;
    }

    public void setSolved(List<SolvedQuestion> solved) {
        this.solved = solved;
    }
}

