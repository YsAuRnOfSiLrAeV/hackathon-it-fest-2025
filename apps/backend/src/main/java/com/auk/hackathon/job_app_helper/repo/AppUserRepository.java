package com.auk.hackathon.job_app_helper.repo;

import com.auk.hackathon.job_app_helper.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
  Optional<AppUser> findByProviderAndProviderId(String provider, String providerId);
  Optional<AppUser> findByEmail(String email);
}