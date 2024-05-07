package com.example.MRMSAPI.Repo;
import com.example.MRMSAPI.Entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/*
Patient Data JPA repository class
*/

@EnableJpaRepositories
@Repository
public interface PatientRepo extends JpaRepository<Patient, Integer>{

    Optional<Patient> findOneByEmailAndPassword(String email, String password);
    Patient findByEmail(String email);
}