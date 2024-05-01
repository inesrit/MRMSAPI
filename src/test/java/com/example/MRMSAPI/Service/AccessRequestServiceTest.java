package com.example.MRMSAPI.Service;

import com.example.MRMSAPI.Entity.AccessRequest;
import com.example.MRMSAPI.Entity.Patient;
import com.example.MRMSAPI.Entity.User;
import com.example.MRMSAPI.Enum.RequestStatus;
import com.example.MRMSAPI.Repo.AccessRequestRepo;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AccessRequestServiceTest {

    @Mock
    private AccessRequestRepo accessRequestRepo;

    @InjectMocks
    private AccessRequestService accessRequestService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void createAccessRequest() {

        User user = new User();
        user.setUsername("testUser");
        user.setEmail("test@example.com");
        user.setPassword("password");

        Patient patient = new Patient();
        patient.setPatientName("testUser");
        patient.setEmail("test@example.com");
        patient.setPassword("password");

        AccessRequest accessRequest = new AccessRequest();
        accessRequest.setPatient(patient);
        accessRequest.setPatient(patient);
        accessRequest.setUser(user);
        accessRequest.setStatus(RequestStatus.PENDING);

        when(accessRequestRepo.save(any(AccessRequest.class))).thenReturn(accessRequest);

        AccessRequest savedRequest = accessRequestService.createAccessRequest(user, patient);

        assertEquals(accessRequest, savedRequest);
        verify(accessRequestRepo, times(1)).save(any(AccessRequest.class));
    }

//    @Test
//    void grantAccessRequest() {
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
//        AccessRequest accessRequest = new AccessRequest();
//        accessRequest.setPatient(patient);
//        accessRequest.setPatient(patient);
//        accessRequest.setUser(user);
//        accessRequest.setStatus(RequestStatus.PENDING);
//
//        // Set up mocked repository response
//        when(accessRequestRepo.findById(anyLong())).thenReturn(Optional.of(accessRequest));
//
//        accessRequestService.grantAccessRequest(accessRequest);
//
////        assertEquals(RequestStatus.APPROVED, accessRequest.getStatus());
////        verify(accessRequestRepo, times(1)).findById(anyLong());
////        verify(accessRequestRepo, times(1)).save(any(AccessRequest.class));
//    }

//    @Test
//    void revokeAccessRequest() {
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
//        AccessRequest accessRequest = new AccessRequest();
//        accessRequest.setPatient(patient);
//        accessRequest.setPatient(patient);
//        accessRequest.setUser(user);
//        accessRequest.setStatus(RequestStatus.APPROVED);
//
//        when(accessRequestRepo.findById(anyLong())).thenReturn(Optional.of(accessRequest));
//
//        accessRequestService.revokeAccessRequest(accessRequest);
//
////        assertEquals(RequestStatus.DENIED, accessRequest.getStatus());
////        verify(accessRequestRepo, times(1)).findById(anyLong());
////        verify(accessRequestRepo, times(1)).save(any(AccessRequest.class));
//    }


   // @Test
//    void updateRequestStatus() {
//        // Set up test data
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
//        AccessRequest accessRequest = new AccessRequest();
//        accessRequest.setId(1L);
//        accessRequest.setPatient(patient);
//        accessRequest.setPatient(patient);
//        accessRequest.setUser(user);
//        accessRequest.setStatus(RequestStatus.PENDING);
//
//        RequestStatus newStatus = RequestStatus.APPROVED;
//
//        // Set up mocked repository response
//        when(accessRequestRepo.findById(anyLong())).thenReturn(Optional.of(accessRequest));
//
//        // Call the service method
//        accessRequestService.updateRequestStatus(1L, newStatus);
//
//        // Verify that the access request status is updated
////        assertEquals(newStatus, accessRequest.getStatus());
////        verify(accessRequestRepo, times(1)).findById(anyLong());
////        verify(accessRequestRepo, times(1)).save(any(AccessRequest.class));
//    }

    @Test
    void revokeAccess() {
    }

    @Test
    void getAllPatientRequests() {
    }

    @Test
    void getRequestById() {
    }
}