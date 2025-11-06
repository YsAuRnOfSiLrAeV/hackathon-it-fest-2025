package com.auk.hackathon.job_app_helper.service;

import com.auk.hackathon.job_app_helper.dto.CvDto;
import com.auk.hackathon.job_app_helper.dto.CvUpdateDto;
import com.auk.hackathon.job_app_helper.model.AppUser;
import com.auk.hackathon.job_app_helper.model.Cv;
import com.auk.hackathon.job_app_helper.repo.CvRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CvService {

  private final CvRepository cvRepository;
  private final UserService userService;

  public CvService(CvRepository cvRepository, UserService userService) {
    this.cvRepository = cvRepository;
    this.userService = userService;
  }

  @Transactional(readOnly = true)
  public CvDto getCv(Authentication authentication) {
    AppUser user = userService.getCurrentUser(authentication)
        .orElseThrow(() -> new IllegalStateException("Authenticated user not found"));
    return cvRepository.findByUser_Id(user.getId())
        .map(CvDto::new)
        .orElseGet(CvDto::new);
  }

  @Transactional
  public CvDto updateCv(Authentication authentication, CvUpdateDto input) {
    AppUser user = userService.getCurrentUser(authentication)
        .orElseThrow(() -> new IllegalStateException("Authenticated user not found"));

    Cv entity = cvRepository.findByUser_Id(user.getId()).orElseGet(() -> {
      Cv c = new Cv();
      c.setUser(user);
      return c;
    });

    entity.setFullName(input.getFullName() != null ? input.getFullName() : "");
    entity.setEmail(input.getEmail());
    entity.setPhone(input.getPhone());
    entity.setLocation(input.getLocation());
    entity.setWebsite(input.getWebsite());
    entity.setGithub(input.getGithub());
    entity.setLinkedin(input.getLinkedin());
    entity.setSummary(input.getSummary());
    entity.setSkills(input.getSkills());
    entity.setExperience(input.getExperience());
    entity.setProjects(input.getProjects());
    entity.setEducation(input.getEducation());

    Cv saved = cvRepository.save(entity);
    return new CvDto(saved);
  }
}


