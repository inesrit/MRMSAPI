package com.example.MRMSAPI.Service;

import com.example.MRMSAPI.Entity.MedicalRecord;
import com.example.MRMSAPI.Entity.Patient;
import com.example.MRMSAPI.Entity.User;
import com.example.MRMSAPI.Repo.MedicalRecordRepo;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
class MedicalRecordServiceTest {

    @Mock
    private MedicalRecordRepo medicalRecordRepo;

    @InjectMocks
    private MedicalRecordService medicalRecordService;

    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void createMedicalRecord() {
        // Set up test data
        Patient patient = new Patient(); // Create patient object
        User user = new User(); // Create user object
        String recordDate = "2022-03-15"; // Set record date
        String recordName = "Test Record"; // Set record name
        String recordType = "Test Type"; // Set record type
        String recordResult = "Test Result"; // Set record result

        // Mock repository response
        when(medicalRecordRepo.save(any())).thenReturn(new MedicalRecord());

        // Call service method
        MedicalRecord createdRecord = medicalRecordService.createMedicalRecord(patient, user, recordDate, recordName, recordType, recordResult);

        // Verify that the record is saved
        assertNotNull(createdRecord);
        verify(medicalRecordRepo, times(1)).save(any());
    }

    @Test
    void updateMedicalRecord() {
        // Set up test data
        MedicalRecord medicalRecord = new MedicalRecord(); // Create medical record object
        medicalRecord.setMedicalrecordid(1); // Set medical record ID
        String newRecordName = "Updated Record Name"; // New record name

        // Mock repository response
        when(medicalRecordRepo.save(any())).thenReturn(medicalRecord);
        when(medicalRecordRepo.findById(any())).thenReturn(Optional.of(medicalRecord));

        // Call service method
        medicalRecordService.updateMedicalRecord(medicalRecord);

        MedicalRecord updatedRecord = medicalRecordService.getMedicalRecordById(medicalRecord.getMedicalrecordid());

                // Verify that the record is updated
        assertNotNull(updatedRecord);
        assertEquals(newRecordName, updatedRecord.getRecordName());
        verify(medicalRecordRepo, times(1)).save(any());
        verify(medicalRecordRepo, times(1)).findById(any());
    }

    @Test
    void deleteMedicalRecord() {
        // Set up test data
        int medicalRecordId = 1; // Medical record ID

        // Call service method
        medicalRecordService.deleteMedicalRecord(medicalRecordId);

        // Verify that the record is deleted
        verify(medicalRecordRepo, times(1)).deleteById(medicalRecordId);
    }

    @Test
    void getMedicalRecordById() {
        // Set up test data
        int medicalRecordId = 1; // Medical record ID
        MedicalRecord medicalRecord = new MedicalRecord(); // Create medical record object

        // Mock repository response
        when(medicalRecordRepo.findById(any())).thenReturn(Optional.of(medicalRecord));

        // Call service method
        MedicalRecord foundRecord = medicalRecordService.getMedicalRecordById(medicalRecordId);

        // Verify that the record is found
        //assertTrue(foundRecord.isPresent());
        assertEquals(medicalRecord.getRecordDate(), foundRecord.getRecordDate());
        verify(medicalRecordRepo, times(1)).findById(any());
    }

    @Test
    void getAllMedicalRecords() {
        // Set up test data
        List<MedicalRecord> medicalRecords = Collections.singletonList(new MedicalRecord()); // Create list of medical records

        // Mock repository response
        when(medicalRecordRepo.findAll()).thenReturn(medicalRecords);

        // Call service method
        List<MedicalRecord> foundRecords = medicalRecordService.getAllMedicalRecords();

        // Verify that all records are found
        assertEquals(medicalRecords.size(), foundRecords.size());
        assertEquals(medicalRecords, foundRecords);
        verify(medicalRecordRepo, times(1)).findAll();
    }

    @Test
    void getAllMedicalRecordsByPatientId() {
        // Set up test data
        int patientId = 1; // Patient ID
        List<MedicalRecord> medicalRecords = Collections.singletonList(new MedicalRecord()); // Create list of medical records

        // Mock repository response
        when(medicalRecordRepo.findAllByPatient_Patientid(any())).thenReturn(medicalRecords);

        // Call service method
        List<MedicalRecord> foundRecords = medicalRecordService.getAllMedicalRecordsByPatientId(patientId);

        // Verify that all records for the patient are found
        assertEquals(medicalRecords.size(), foundRecords.size());
        assertEquals(medicalRecords, foundRecords);
        verify(medicalRecordRepo, times(1)).findAllByPatient_Patientid(any());
    }
}