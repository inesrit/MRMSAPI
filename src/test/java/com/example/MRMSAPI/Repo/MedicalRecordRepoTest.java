package com.example.MRMSAPI.Repo;

import com.example.MRMSAPI.Entity.MedicalRecord;
import com.example.MRMSAPI.Entity.Patient;
import com.example.MRMSAPI.Entity.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class MedicalRecordRepoTest {

    @Autowired
    private MedicalRecordRepo medicalRecordRepo;

    @Autowired
    private PatientRepo patientRepo;

    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

//    @Test
//    void testFindAllByPatient_Patientid() {
//        // Create a test patient
//        User user = new User();
//        user.setUsername("testUser");
//        user.setEmail("test@example.com");
//        user.setPassword("password");
//
//        Patient patient = new Patient();
//        patient.setPatientName("testUser");
//        patient.setEmail("test@example.com");
//        patient.setPassword("password");
//
//        // Create a sample medical record
//        MedicalRecord medicalRecord = new MedicalRecord();
//        // Set medical record properties
//        medicalRecord.setRecordType("exmaple type");
//        medicalRecord.setRecordName("example name");
//        medicalRecord.setRecordDate("example date");
//        medicalRecord.setRecordResult("example result");
//        medicalRecord.setUser(user);
//        medicalRecord.setPatient(patient);
//        medicalRecordRepo.save(medicalRecord);
//
//        MedicalRecord medicalRecord2 = new MedicalRecord();
//        // Set medical record properties
//        medicalRecord2.setRecordType("exmaple type");
//        medicalRecord2.setRecordName("example name");
//        medicalRecord2.setRecordDate("example date");
//        medicalRecord2.setRecordResult("example result");
//        medicalRecord2.setUser(user);
//        medicalRecord2.setPatient(patient);
//        medicalRecordRepo.save(medicalRecord2);
//
//        // Find medical records by patient id
//        List<MedicalRecord> medicalRecords = medicalRecordRepo.findAllByPatient_Patientid(patient.getPatientid());
//
//        // Assert that the list is not null and contains the expected number of medical records
//        assertNotNull(medicalRecords);
//        assertEquals(2, medicalRecords.size());
//    }

//    @Test
//    void testDeleteByMedicalRecordId() {
//
//        User user = new User();
//        user.setUsername("testUser");
//        user.setEmail("test@example.com");
//        user.setPassword("password");
//
//        Patient patient = new Patient();
//        patient.setPatientName("testUser");
//        patient.setEmail("test@example.com");
//        patient.setPassword("password");
//
//        // Create a sample medical record
//        MedicalRecord medicalRecord = new MedicalRecord();
//        // Set medical record properties
//        medicalRecord.setRecordType("exmaple type");
//        medicalRecord.setRecordName("example name");
//        medicalRecord.setRecordDate("example date");
//        medicalRecord.setRecordResult("example result");
//        medicalRecord.setUser(user);
//        medicalRecord.setPatient(patient);
//
//        // Save the medical record to the repository
//        MedicalRecord savedMedicalRecord = medicalRecordRepo.save(medicalRecord);
//
//        // Delete the medical record by its ID
//        medicalRecordRepo.deleteByMedicalRecordId(savedMedicalRecord.getMedicalrecordid());
//
//        // Verify that the medical record is deleted
//        assertFalse(medicalRecordRepo.existsById(savedMedicalRecord.getMedicalrecordid()));
//    }
}