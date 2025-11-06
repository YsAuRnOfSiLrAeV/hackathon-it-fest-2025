package com.auk.hackathon.job_app_helper.repo;

import com.auk.hackathon.job_app_helper.model.Cv;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CvRepository extends JpaRepository<Cv, Long> {
  Optional<Cv> findByUser_Id(Long userId);
}


