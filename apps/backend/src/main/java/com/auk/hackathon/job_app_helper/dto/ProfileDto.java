package com.auk.hackathon.job_app_helper.dto;

import java.time.LocalDateTime;

import com.auk.hackathon.job_app_helper.model.AppUser;

import jakarta.validation.constraints.NotNull;

public class ProfileDto {
    @NotNull
    private Long id;
    @NotNull
    private String email;
    private String name;
    private String githubUrl;
    private String linkedinUrl;
    private String websiteUrl;
    private String bio;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime lastLoginAt;

    public ProfileDto() {}

    public ProfileDto(AppUser user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.name = user.getName();
        this.githubUrl = user.getGithubUrl();
        this.linkedinUrl = user.getLinkedinUrl();
        this.websiteUrl = user.getWebsiteUrl();
        this.bio = user.getBio();
    }

    public Long getId() { return id; }
    public String getEmail() { return email; }
    public String getName() { return name; }
    public String getGithubUrl() { return githubUrl; }
    public String getLinkedinUrl() { return linkedinUrl; }
    public String getWebsiteUrl() { return websiteUrl; }
    public String getBio() { return bio; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public LocalDateTime getLastLoginAt() { return lastLoginAt; }
}
