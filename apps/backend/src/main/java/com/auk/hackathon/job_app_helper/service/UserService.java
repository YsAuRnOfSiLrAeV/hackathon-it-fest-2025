package com.auk.hackathon.job_app_helper.service;

import com.auk.hackathon.job_app_helper.model.AppUser;
import com.auk.hackathon.job_app_helper.repo.AppUserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

  private final AppUserRepository appUserRepository;

  public UserService(AppUserRepository appUserRepository) {
    this.appUserRepository = appUserRepository;
  }

  @Transactional
  public AppUser upsertFromAuthentication(Authentication authentication) {
    if (!(authentication instanceof OAuth2AuthenticationToken token)) {
      throw new IllegalArgumentException("Unsupported authentication type: " + authentication.getClass().getSimpleName());
    }

    String provider = token.getAuthorizedClientRegistrationId();
    Object principal = token.getPrincipal();

    String providerId = null;
    String email = null;
    String name = null;

    if (principal instanceof OidcUser u) {
      providerId = u.getSubject();
      email = u.getEmail();
      name = u.getFullName();
    } else if (principal instanceof OAuth2User u) {
      Map<String, Object> a = u.getAttributes();
      Object pid = a.getOrDefault("sub", a.get("id"));
      providerId = pid != null ? String.valueOf(pid) : null;
      email = a.get("email") != null ? String.valueOf(a.get("email")) : null;
      name = a.get("name") != null ? String.valueOf(a.get("name")) : null;
    }

    if (provider == null || providerId == null || providerId.isBlank()) {
      throw new IllegalStateException("Missing provider/providerId");
    }

    var existing = appUserRepository.findByProviderAndProviderId(provider, providerId);
    if (existing.isPresent()) {
        AppUser u = existing.get();
        boolean changed = false;
        if (email != null && !email.equals(u.getEmail())) {
            u.setEmail(email); changed = true;
        }
        if (name != null && !name.equals(u.getName())) {
            u.setName(name);   changed = true;
        }
        return changed ? appUserRepository.save(u) : u;
    } else {
        AppUser u = new AppUser();
        u.setProvider(provider);
        u.setProviderId(providerId);
        u.setEmail(email);
        u.setName(name);
        return appUserRepository.save(u);
    }
  }

  public Optional<AppUser> getCurrentUser(Authentication authentication) {
    if (!(authentication instanceof OAuth2AuthenticationToken)) {
      throw new IllegalArgumentException("Unsupported authentication type: " + authentication.getClass().getSimpleName());
    }

    OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;
    
    return appUserRepository.findByProviderAndProviderId(token.getAuthorizedClientRegistrationId(), token.getName());
  }
}