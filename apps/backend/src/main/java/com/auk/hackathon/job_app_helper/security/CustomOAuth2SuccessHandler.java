package com.auk.hackathon.job_app_helper.security;

import com.auk.hackathon.job_app_helper.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;
import jakarta.servlet.ServletException;

@Component
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private final UserService userService;
    private final String frontendBaseUrl;

    public CustomOAuth2SuccessHandler(UserService userService,
                                    @Value("${FRONTEND_ORIGIN:http://localhost:3000}") String frontendBaseUrl) {
        this.userService = userService;
        this.frontendBaseUrl = frontendBaseUrl;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        userService.upsertFromAuthentication(authentication);
        response.sendRedirect(frontendBaseUrl);
    }
}
