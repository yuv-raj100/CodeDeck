package com.backend.Backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "Questions")
public class Question {

    @Field("ID")
    @JsonProperty("ID")
    private String id;

    @Field("Title")
    @JsonProperty("Title")
    private String title;

    @Field("URL")
    @JsonProperty("URL")
    private String url;

    @Field("Acceptance %")
    @JsonProperty("Acceptance %")
    private String acceptance;

    @Field("Difficulty")
    @JsonProperty("Difficulty")
    private String difficulty;

    @Field("Frequency %")
    @JsonProperty("Frequency %")
    private String frequency;

    @Field("Topics")
    @JsonProperty("Topics")
    private String topics;

    @Field("Company")
    @JsonProperty("Company")
    private String company;

    public Question() {
        // No-args constructor is necessary for deserialization
    }

    public Question(
            @JsonProperty("ID") String id,
            @JsonProperty("Title") String title,
            @JsonProperty("URL") String url,
            @JsonProperty("Acceptance %") String acceptance,
            @JsonProperty("Difficulty") String difficulty,
            @JsonProperty("Frequency %") String frequency,
            @JsonProperty("Topics") String topics,
            @JsonProperty("Company") String company) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.acceptance = acceptance;
        this.difficulty = difficulty;
        this.frequency = frequency;
        this.topics = topics;
        this.company = company;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getUrl() {
        return url;
    }

    public String getAcceptance() {
        return acceptance;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public String getFrequency() {
        return frequency;
    }

    public String getTopics() {
        return topics;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setAcceptance(String acceptance) {
        this.acceptance = acceptance;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public void setTopics(String topics) {
        this.topics = topics;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }
}
