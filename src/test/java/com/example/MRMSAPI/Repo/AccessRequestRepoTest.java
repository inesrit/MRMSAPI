package com.example.MRMSAPI.Repo;

import com.example.MRMSAPI.Entity.AccessRequest;
import com.example.MRMSAPI.Entity.Patient;
import com.example.MRMSAPI.Entity.User;
import com.example.MRMSAPI.Enum.RequestStatus;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@DataJpaTest
class AccessRequestRepoTest {

    @Autowired
    private AccessRequestRepo accessRequestRepo;

    @Autowired
    private PatientRepo patientRepo;

    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

//    @Test
//    void testFindAllByPatient() {
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
//        patientRepo.save(patient);
//
//        // Create sample access requests associated with the patient
//        AccessRequest accessRequest1 = new AccessRequest();
//        accessRequest1.setPatient(patient);
//        accessRequest1.setUser(user);
//        accessRequest1.setStatus(RequestStatus.APPROVED);
//
//        accessRequestRepo.save(accessRequest1);
//
//        AccessRequest accessRequest2 = new AccessRequest();
//        accessRequest2.setPatient(patient);
//        accessRequest1.setPatient(patient);
//        accessRequest1.setUser(user);
//        accessRequest1.setStatus(RequestStatus.APPROVED);
//
//        accessRequestRepo.save(accessRequest2);
//
//        // Find access requests by patient
//        List<AccessRequest> accessRequests = accessRequestRepo.findAllByPatient(patient);
//
//        // Assert that the list is not null and contains the expected number of access requests
//        assertNotNull(accessRequests);
//        assertEquals(2, accessRequests.size());
//    }
}