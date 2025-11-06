package com.auk.hackathon.job_app_helper.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Index;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import java.time.LocalDateTime;

@Entity
@Table(
  name = "app_user",
  indexes = {
    @Index(name = "ux_app_user_provider_pid", columnList = "provider, provider_id", unique = true)
  }
)
public class AppUser {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "provider", nullable = false, length = 32)
  private String provider;

  @Column(name = "provider_id", nullable = false, length = 128)
  private String providerId;

  @Column(name = "email", length = 255)
  private String email;

  @Column(name = "name", length = 255)
  private String name;

  @Column(name="github_url", length = 255)
  private String githubUrl;

  @Column(name="linkedin_url", length = 255)
  private String linkedinUrl;

  @Column(name="website_url", length = 255)
  private String websiteUrl;

  @Column(name="bio", length = 5000)
  private String bio;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt;

  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;

  @Column(name="last_login_at", nullable = true)
  private LocalDateTime lastLoginAt;

  @PrePersist
  void onCreate() {
    LocalDateTime now = LocalDateTime.now();
    this.createdAt = now;
    this.updatedAt = now;
  }

  @PreUpdate
  void onUpdate() {
    this.updatedAt = LocalDateTime.now();
  }

  public Long getId() { return id; }

  public String getProvider() { return provider; }
  public void setProvider(String provider) { this.provider = provider; }

  public String getProviderId() { return providerId; }
  public void setProviderId(String providerId) { this.providerId = providerId; }

  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }

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

  public LocalDateTime getCreatedAt() { return createdAt; }

  public LocalDateTime getUpdatedAt() { return updatedAt; }

  public LocalDateTime getLastLoginAt() { return lastLoginAt; }
  public void setLastLoginAt(LocalDateTime lastLoginAt) { this.lastLoginAt = lastLoginAt; }
}