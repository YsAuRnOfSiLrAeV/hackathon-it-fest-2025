package com.auk.hackathon.job_app_helper.controller;

import com.auk.hackathon.job_app_helper.dto.CvDto;
import com.auk.hackathon.job_app_helper.dto.CvUpdateDto;
import com.auk.hackathon.job_app_helper.service.CvService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.security.core.Authentication;

@RestController
public class CvController {

    private final CvService cvService;

    public CvController(CvService cvService) {
        this.cvService = cvService;
    }

    @GetMapping("/api/cv")
    public CvDto getCv(Authentication auth) {
        return cvService.getCv(auth);
    }

    @PutMapping("/api/cv")
    public CvDto updateCv(Authentication auth, @Valid @RequestBody CvUpdateDto cv) {
        return cvService.updateCv(auth, cv);
    }
}
