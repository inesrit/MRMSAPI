package com.example.MRMSAPI.Repo;

import com.example.MRMSAPI.Entity.Patient;
import com.example.MRMSAPI.Entity.User;
import com.example.MRMSAPI.Entity.AccessRequest;
import com.example.MRMSAPI.Enum.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.*;

/*
Access Request Data JPA repository class
*/

@EnableJpaRepositories
@Repository
public interface AccessRequestRepo extends JpaRepository<AccessRequest, Long> {

    List<AccessRequest> findAllByPatient(Patient patient);

    List<AccessRequest> findAllByUser(User user);

    List<AccessRequest> findAllByUserAndStatus(User user, RequestStatus status);

    List<AccessRequest> findAllByPatientAndStatus(Patient patient, RequestStatus status);


}
