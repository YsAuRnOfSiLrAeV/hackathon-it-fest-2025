package com.auk.hackathon.job_app_helper.dto;

import com.auk.hackathon.job_app_helper.model.AppUser;

import jakarta.validation.constraints.Size;

public class ProfileUpdateDto {
    @Size(max = 255)
    private String name;
    @Size(max = 255)
    private String githubUrl;
    @Size(max = 255)
    private String linkedinUrl;
    @Size(max = 255)
    private String websiteUrl;
    @Size(max = 5000)
    private String bio;

    public ProfileUpdateDto() {}

    public ProfileUpdateDto(AppUser user) {
        this.name = user.getName();
        this.githubUrl = user.getGithubUrl();
        this.linkedinUrl = user.getLinkedinUrl();
        this.websiteUrl = user.getWebsiteUrl();
        this.bio = user.getBio();
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }

    public String getLinkedinUrl() { return linkedinUrl; }
    public void setLinkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; }

    public String getWebsiteUrl() { return websiteUrl; }
    public void setWebsiteUrl(String websiteUrl) { this.websiteUrl = websiteUrl; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
}