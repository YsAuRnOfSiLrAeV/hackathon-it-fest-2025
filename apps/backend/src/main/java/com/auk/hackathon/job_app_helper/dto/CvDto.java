package com.auk.hackathon.job_app_helper.dto;

import com.auk.hackathon.job_app_helper.model.Cv;

public class CvDto {
  private Long id;
  private String fullName;
  private String email;
  private String phone;
  private String location;
  private String website;
  private String github;
  private String linkedin;
  private String summary;
  private String skills;
  private String experience;
  private String projects;
  private String education;

  public CvDto() {}

  public CvDto(Cv cv) {
    this.id = cv.getId();
    this.fullName = cv.getFullName() != null ? cv.getFullName() : "";
    this.email = cv.getEmail() != null ? cv.getEmail() : "";
    this.phone = cv.getPhone() != null ? cv.getPhone() : "";
    this.location = cv.getLocation() != null ? cv.getLocation() : "";
    this.website = cv.getWebsite() != null ? cv.getWebsite() : "";
    this.github = cv.getGithub() != null ? cv.getGithub() : "";
    this.linkedin = cv.getLinkedin() != null ? cv.getLinkedin() : "";
    this.summary = cv.getSummary() != null ? cv.getSummary() : "";
    this.skills = cv.getSkills() != null ? cv.getSkills() : "";
    this.experience = cv.getExperience() != null ? cv.getExperience() : "";
    this.projects = cv.getProjects() != null ? cv.getProjects() : "";
    this.education = cv.getEducation() != null ? cv.getEducation() : "";
  }

  public Long getId() { return id; }
  public String getFullName() { return fullName; }
  public String getEmail() { return email; }
  public String getPhone() { return phone; }
  public String getLocation() { return location; }
  public String getWebsite() { return website; }
  public String getGithub() { return github; }
  public String getLinkedin() { return linkedin; }
  public String getSummary() { return summary; }
  public String getSkills() { return skills; }
  public String getExperience() { return experience; }
  public String getProjects() { return projects; }
  public String getEducation() { return education; }
}


