package com.backend.Backend.models;

public class SolvedQuestion {

    private String id;
    private String difficulty;

    public String getDifficulty() {
        return difficulty;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public SolvedQuestion(String id, String difficulty) {
        this.id = id;
        this.difficulty = difficulty;
    }

    public String getId() {
        return id;
    }
}
