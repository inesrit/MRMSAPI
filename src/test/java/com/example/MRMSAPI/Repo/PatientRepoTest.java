package com.example.MRMSAPI.Repo;

import com.example.MRMSAPI.Entity.Patient;
import com.example.MRMSAPI.Entity.User;
import com.example.MRMSAPI.Service.PatientService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
class PatientRepoTest {

    @Mock
    private PatientRepo patientRepo;

    @InjectMocks
    private PatientService patientService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void findOneByEmailAndPassword() {
        // Mocking
        String email = "test@example.com";
        String password = "password";
        Patient patient = new Patient();
        patient.setEmail(email);
        patient.setPassword(password);
        when(patientRepo.findOneByEmailAndPassword(email, password)).thenReturn(Optional.of(patient));

        // Test
        Optional<Patient> foundPatient = patientRepo.findOneByEmailAndPassword(email, password);

        // Assertion
        assertEquals(patient, foundPatient.orElse(null));
    }

    @Test
    void findByEmail() {
        // Mocking
        String email = "test@example.com";
        Patient patient = new Patient();
        patient.setEmail(email);
        when(patientRepo.findByEmail(email)).thenReturn(patient);

        // Test
        Patient foundPatient = patientRepo.findByEmail(email);

        // Assertion
        assertEquals(patient, foundPatient);
    }
}