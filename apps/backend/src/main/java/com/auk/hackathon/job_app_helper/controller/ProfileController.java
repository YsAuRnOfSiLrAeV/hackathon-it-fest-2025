package com.auk.hackathon.job_app_helper.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import org.springframework.security.core.Authentication;

import com.auk.hackathon.job_app_helper.dto.ProfileDto;
import com.auk.hackathon.job_app_helper.dto.ProfileUpdateDto;
import com.auk.hackathon.job_app_helper.model.AppUser;
import com.auk.hackathon.job_app_helper.service.UserService;
import com.auk.hackathon.job_app_helper.repo.AppUserRepository;

import jakarta.validation.Valid;

import java.util.Optional;

@RestController
public class ProfileController {

    private final UserService userService;
    private final AppUserRepository appUserRepository;

    public ProfileController(UserService userService, AppUserRepository appUserRepository) {
        this.userService = userService;
        this.appUserRepository = appUserRepository;
    }

    @GetMapping("/api/profile")
    public ProfileDto getProfile(Authentication auth) {
        Optional<AppUser> user = userService.getCurrentUser(auth);
        if (user.isPresent()) {
            return new ProfileDto(user.get());
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
    }

    @PutMapping("/api/profile")
    public ProfileDto updateProfile(Authentication auth, @Valid @RequestBody ProfileUpdateDto dto) {
        Optional<AppUser> userOpt = userService.getCurrentUser(auth);
        if (userOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        AppUser user = userOpt.get();
        user.setName(normalize(dto.getName()));
        user.setGithubUrl(normalize(dto.getGithubUrl()));
        user.setLinkedinUrl(normalize(dto.getLinkedinUrl()));
        user.setWebsiteUrl(normalize(dto.getWebsiteUrl()));
        user.setBio(normalize(dto.getBio()));
        AppUser saved = appUserRepository.save(user);
        return new ProfileDto(saved);
    }

    @DeleteMapping("/api/account")
    public void deleteAccount(Authentication auth) {
        Optional<AppUser> userOpt = userService.getCurrentUser(auth);
        if (userOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        appUserRepository.delete(userOpt.get());
    }

    private String normalize(String value) {
        if (value == null) return null;
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }
}