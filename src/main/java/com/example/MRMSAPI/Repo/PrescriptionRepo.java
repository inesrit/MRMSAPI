package com.example.MRMSAPI.Repo;


import com.example.MRMSAPI.Entity.Appointment;
import com.example.MRMSAPI.Entity.MedicalRecord;
import com.example.MRMSAPI.Entity.Patient;
import com.example.MRMSAPI.Entity.Prescription;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.*;


/*
Prescription Data JPA repository class
*/

@EnableJpaRepositories
@Repository
public interface PrescriptionRepo  extends JpaRepository<Prescription, Integer>{

    List<Prescription> findAllByPatient_Patientid(int patientId);

    List<Prescription> findAllByUser_Userid(int userId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Prescription m WHERE m.prescriptionid = :prescriptionId")
    void deleteByPrescriptionId(@Param("prescriptionId") int prescriptionId);

}
