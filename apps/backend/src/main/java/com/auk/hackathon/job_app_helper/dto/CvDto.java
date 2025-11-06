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
    this.fullName = cv.getFullName();
    this.email = cv.getEmail();
    this.phone = cv.getPhone();
    this.location = cv.getLocation();
    this.website = cv.getWebsite();
    this.github = cv.getGithub();
    this.linkedin = cv.getLinkedin();
    this.summary = cv.getSummary();
    this.skills = cv.getSkills();
    this.experience = cv.getExperience();
    this.projects = cv.getProjects();
    this.education = cv.getEducation();
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


