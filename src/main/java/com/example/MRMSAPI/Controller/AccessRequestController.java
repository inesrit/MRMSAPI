package com.example.MRMSAPI.Controller;

import com.example.MRMSAPI.Entity.AccessRequest;
import com.example.MRMSAPI.Entity.Patient;
import com.example.MRMSAPI.Enum.RequestStatus;
import com.example.MRMSAPI.Service.AccessRequestService;
import com.example.MRMSAPI.Service.PatientService;
import com.example.MRMSAPI.Service.UserService;
import com.example.MRMSAPI.Entity.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/*
Access Request rest API controller
*/
@RestController
@CrossOrigin(origins = "https://appmrms-49191739e0bc.herokuapp.com", allowCredentials = "true")
@RequestMapping("api/v1/access-requests")
public class AccessRequestController {


    @Autowired
    private AccessRequestService accessRequestService;

    @Autowired
    private UserService userService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private HttpSession session;

    //method that creates a new access request
    //can only be performed by the logged-in user requesting access
    @PostMapping(path = "/create")
    public ResponseEntity<AccessRequest> createAccessRequest(@RequestParam int userId, @RequestParam int patientId) {
        User user = userService.getUserDetailsById(userId);
        Patient patient = patientService.getPatientDetailsById(patientId);
        AccessRequest request = accessRequestService.createAccessRequest(user, patient);
        return ResponseEntity.ok(request);
    }

    //method that updates the status of a specific access request
    //can only be performed by the patient
    @PutMapping(path = "/update-status")
    public ResponseEntity<String> updateRequestStatus(@RequestParam Long requestId, @RequestParam RequestStatus status) {
        accessRequestService.updateRequestStatus(requestId, status);
        return ResponseEntity.ok("Request status updated successfully");
    }

    //method that deletes a specific access request
    @DeleteMapping(path = "/revoke-access")
    public ResponseEntity<String> revokeAccess(@RequestParam Long requestId) {
        accessRequestService.revokeAccess(requestId);
        return ResponseEntity.ok("Request deleted successfully");
    }

    //method that gets all requests of  specific patient
    @GetMapping(path = "/all-patient-requests")
    public ResponseEntity<List<AccessRequest>> getAllPatientRequests(@RequestParam int patientId) {
        Patient patient = patientService.getPatientDetailsById(patientId);
        List<AccessRequest> accessRequests = accessRequestService.getAllPatientRequests(patient);
        return ResponseEntity.ok(accessRequests);
    }

    @GetMapping(path = "/all-user-requests")
    public ResponseEntity<List<AccessRequest>> getAllUserRequests(@RequestParam int userId) {
        User user = userService.getUserDetailsById(userId);
        List<AccessRequest> accessRequests = accessRequestService.getAllUserRequests(user);
        return ResponseEntity.ok(accessRequests);
    }

    @GetMapping("/all-user-requests-approved")
    public ResponseEntity<List<Patient>> getAllUserRequestsApproved(@RequestParam int userId) {
        List<Patient> approvedPatients = accessRequestService.getAllUserApprovedPatients(userId);
        return ResponseEntity.ok(approvedPatients);
    }

    @GetMapping("/all-patient-requests-approved")
    public ResponseEntity<List<User>> getAllPatientRequestsApproved(@RequestParam int patientId) {
        List<User> approvedUsers = accessRequestService.getAllPatientApprovedUsers(patientId);
        return ResponseEntity.ok(approvedUsers);
    }



    //method that gets a specific ID request details
    @GetMapping(path = "/request-details")
    public ResponseEntity<AccessRequest> getRequestById(@RequestParam Long requestId) {
        AccessRequest accessRequest = accessRequestService.getRequestById(requestId);
        if (accessRequest != null) {
            return ResponseEntity.ok(accessRequest);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
