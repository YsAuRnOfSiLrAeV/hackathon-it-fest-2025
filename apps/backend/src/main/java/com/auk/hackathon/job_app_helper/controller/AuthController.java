// src/main/java/.../controller/AuthController.java
package com.auk.hackathon.job_app_helper.controller;

import com.auk.hackathon.job_app_helper.dto.MeDto;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class AuthController {

  @GetMapping("/api/me")
  public MeDto me(@AuthenticationPrincipal Object principal) {
    if (principal instanceof OidcUser u) {
      return new MeDto(u.getSubject(), u.getEmail(), u.getFullName(), u.getPicture());
    }
    if (principal instanceof OAuth2User u) {
      Map<String, Object> a = u.getAttributes();
      return new MeDto(
        String.valueOf(a.getOrDefault("sub", a.getOrDefault("id",""))),
        String.valueOf(a.getOrDefault("email","")),
        String.valueOf(a.getOrDefault("name","")),
        String.valueOf(a.getOrDefault("picture",""))
      );
    }
    return new MeDto(null,null,null,null);
  }
}
