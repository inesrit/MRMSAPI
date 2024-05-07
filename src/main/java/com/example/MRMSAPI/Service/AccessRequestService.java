package com.example.MRMSAPI.Service;

import com.example.MRMSAPI.Entity.AccessRequest;
import com.example.MRMSAPI.Entity.Patient;
import com.example.MRMSAPI.Entity.User;
import com.example.MRMSAPI.Enum.RequestStatus;
import com.example.MRMSAPI.Repo.AccessRequestRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/*
Access Request service class
*/

@Service
public class AccessRequestService {

    @Autowired
    private AccessRequestRepo accessRequestRepository;

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private UserService userService;

    @Autowired
    private PatientService patientService;

    public AccessRequest createAccessRequest(User user, Patient patient) {
        AccessRequest request = new AccessRequest();
        request.setUser(user);
        request.setPatient(patient);
        request.setStatus(RequestStatus.PENDING);
        return accessRequestRepository.save(request);
    }

    public void grantAccessRequest(AccessRequest accessRequest) {
        // Grant access by adding associations between user and patient
        User user = accessRequest.getUser();
        Patient patient = accessRequest.getPatient();

        userService.addPatientToUser(user, patient);
        patientService.addUserToPatient(user, patient);


    }

    public void revokeAccessRequest(AccessRequest accessRequest) {
        // Revoke access by removing associations between user and patient
        User user = accessRequest.getUser();
        Patient patient = accessRequest.getPatient();

        userService.removePatientFromUser(user, patient);
        patientService.removeUserFromPatient(user, patient);

    }


    public void updateRequestStatus(Long requestId, RequestStatus status) {
        AccessRequest request = accessRequestRepository.findById(requestId)
                .orElseThrow(() -> new EntityNotFoundException("Access request not found"));
        request.setStatus(status);
        accessRequestRepository.save(request);

        if (status == RequestStatus.APPROVED) {
            grantAccessRequest(request);
        } else if (status == RequestStatus.DENIED) {
            revokeAccessRequest(request);
        }
    }

    public void revokeAccess(Long requestId) {
        AccessRequest request = accessRequestRepository.findById(requestId)
                .orElseThrow(() -> new EntityNotFoundException("Access request not found"));
        revokeAccessRequest(request);
        accessRequestRepository.deleteById(requestId);
    }


    public List<AccessRequest> getAllPatientRequests(Patient patient) {
        return accessRequestRepository.findAllByPatient(patient);
    }

    public List<AccessRequest> getAllUserRequests(User user) {
        return accessRequestRepository.findAllByUser(user);
    }

    public List<Patient> getAllUserApprovedPatients(int userId) {
        User user = userService.getUserDetailsById(userId);
        List<AccessRequest> approvedRequests = accessRequestRepository.findAllByUserAndStatus(user, RequestStatus.APPROVED);

        List<Patient> approvedPatients = new ArrayList<>();
        for (AccessRequest request : approvedRequests) {
            approvedPatients.add(request.getPatient());
        }

        return approvedPatients;
    }

    public List<User> getAllPatientApprovedUsers(int patientId) {
        Patient patient = patientService.getPatientDetailsById(patientId);
        List<AccessRequest> approvedRequests = accessRequestRepository.findAllByPatientAndStatus(patient, RequestStatus.APPROVED);

        List<User> approvedUsers = new ArrayList<>();
        for (AccessRequest request : approvedRequests) {
            approvedUsers.add(request.getUser());
        }

        return approvedUsers;
    }


    public AccessRequest getRequestById(Long requestId) {
        return accessRequestRepository.findById(requestId).orElse(null);
    }



}
