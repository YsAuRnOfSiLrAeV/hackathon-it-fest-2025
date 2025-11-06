package com.auk.hackathon.job_app_helper.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

  private final CustomOAuth2SuccessHandler customOAuth2SuccessHandler;

  public SecurityConfig(CustomOAuth2SuccessHandler customOAuth2SuccessHandler) {
    this.customOAuth2SuccessHandler = customOAuth2SuccessHandler;
  }

  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
      .csrf(csrf -> csrf.disable())
      .cors(Customizer.withDefaults())
      .authorizeHttpRequests(auth -> auth
          .requestMatchers("/actuator/health", "/api/ping").permitAll()
          .anyRequest().authenticated()
      )
      .exceptionHandling(e -> e
          .defaultAuthenticationEntryPointFor(
              new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED),
              new AntPathRequestMatcher("/api/**")
          )
      )
      .formLogin(form -> form.disable())
      .httpBasic(basic -> basic.disable())
      .oauth2Login(o -> o.successHandler(customOAuth2SuccessHandler))
      .logout(l -> l.logoutSuccessUrl("http://localhost:3000/").permitAll());
    return http.build();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource(
      @Value("${FRONTEND_ORIGIN:http://localhost:3000}") String origin) {
    CorsConfiguration c = new CorsConfiguration();
    c.setAllowedOrigins(List.of(origin));
    c.setAllowedMethods(List.of("GET","POST","PUT","PATCH","DELETE","OPTIONS"));
    c.setAllowedHeaders(List.of("*"));
    c.setAllowCredentials(true);
    UrlBasedCorsConfigurationSource s = new UrlBasedCorsConfigurationSource();
    s.registerCorsConfiguration("/**", c);
    return s;
  }
}
