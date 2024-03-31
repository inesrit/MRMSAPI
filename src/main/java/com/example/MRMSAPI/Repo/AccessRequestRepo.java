package com.example.MRMSAPI.Repo;

import com.example.MRMSAPI.Entity.Patient;
import com.example.MRMSAPI.Entity.AccessRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.*;


@EnableJpaRepositories
@Repository
public interface AccessRequestRepo extends JpaRepository<AccessRequest, Long> {

    List<AccessRequest> findAllByPatient(Patient patient);

}
