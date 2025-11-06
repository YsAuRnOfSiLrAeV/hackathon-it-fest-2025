package com.auk.hackathon.job_app_helper.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "cv")
public class Cv {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne(optional = false)
  @JoinColumn(name = "user_id", nullable = false, unique = true)
  private AppUser user;

  @Column(name = "full_name", nullable = false, length = 255)
  private String fullName;

  @Column(name = "email", length = 255)
  private String email;

  @Column(name = "phone", length = 64)
  private String phone;

  @Column(name = "location", length = 255)
  private String location;

  @Column(name = "website", length = 255)
  private String website;

  @Column(name = "github", length = 255)
  private String github;

  @Column(name = "linkedin", length = 255)
  private String linkedin;

  @Column(name = "summary", length = 5000)
  private String summary;

  @Column(name = "skills", length = 5000)
  private String skills;

  @Column(name = "experience", length = 5000)
  private String experience;

  @Column(name = "projects", length = 5000)
  private String projects;

  @Column(name = "education", length = 5000)
  private String education;

  public Long getId() { return id; }

  public AppUser getUser() { return user; }
  public void setUser(AppUser user) { this.user = user; }

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
