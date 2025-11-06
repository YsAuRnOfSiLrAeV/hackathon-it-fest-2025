package com.auk.hackathon.job_app_helper.dto;

import jakarta.validation.constraints.Size;

public class CvUpdateDto {
  @Size(max = 255)
  private String fullName;
  @Size(max = 255)
  private String email;
  @Size(max = 64)
  private String phone;
  @Size(max = 255)
  private String location;
  @Size(max = 255)
  private String website;
  @Size(max = 255)
  private String github;
  @Size(max = 255)
  private String linkedin;
  @Size(max = 5000)
  private String summary;
  @Size(max = 5000)
  private String skills;
  @Size(max = 5000)
  private String experience;
  @Size(max = 5000)
  private String projects;
  @Size(max = 5000)
  private String education;

  public CvUpdateDto() {}

  public String getFullName() { return fullName; }
  public void setFullName(String fullName) { this.fullName = fullName; }
  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }
  public String getPhone() { return phone; }
  public void setPhone(String phone) { this.phone = phone; }
  public String getLocation() { return location; }
  public void setLocation(String location) { this.location = location; }
  public String getWebsite() { return website; }
  public void setWebsite(String website) { this.website = website; }
  public String getGithub() { return github; }
  public void setGithub(String github) { this.github = github; }
  public String getLinkedin() { return linkedin; }
  public void setLinkedin(String linkedin) { this.linkedin = linkedin; }
  public String getSummary() { return summary; }
  public void setSummary(String summary) { this.summary = summary; }
  public String getSkills() { return skills; }
  public void setSkills(String skills) { this.skills = skills; }
  public String getExperience() { return experience; }
  public void setExperience(String experience) { this.experience = experience; }
  public String getProjects() { return projects; }
  public void setProjects(String projects) { this.projects = projects; }
  public String getEducation() { return education; }
  public void setEducation(String education) { this.education = education; }
}


