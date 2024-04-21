package com.example.MRMSAPI.Repo;

import com.example.MRMSAPI.Entity.MedicalRecord;
import com.example.MRMSAPI.Entity.Patient;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.*;

@EnableJpaRepositories
@Repository
public interface MedicalRecordRepo extends JpaRepository<MedicalRecord, Integer>{

    List<MedicalRecord> findAllByPatient_Patientid(int patientId);

    List<MedicalRecord> findAllByUser_Userid(int userId);

    @Transactional
    @Modifying
    @Query("DELETE FROM MedicalRecord m WHERE m.medicalrecordid = :medicalRecordId")
    void deleteByMedicalRecordId(@Param("medicalRecordId") int medicalRecordId);

}
