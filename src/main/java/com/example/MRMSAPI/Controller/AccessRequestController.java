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

@RestController
@CrossOrigin
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

    @PostMapping(path = "/create")
    public ResponseEntity<AccessRequest> createAccessRequest(@RequestParam int patientId) {
        User loggedInUser = (User) session.getAttribute("loggedInUser");
        Patient patient = patientService.getPatientDetailsById(patientId);
        AccessRequest request = accessRequestService.createAccessRequest(loggedInUser, patient);
        return ResponseEntity.ok(request);
    }

    @PutMapping(path = "/update-status")
    public ResponseEntity<String> updateRequestStatus(@RequestParam Long requestId, @RequestParam RequestStatus status) {
        accessRequestService.updateRequestStatus(requestId, status);
        return ResponseEntity.ok("Request status updated successfully");
    }

    @DeleteMapping(path = "/revoke-access")
    public ResponseEntity<String> revokeAccess(@RequestParam Long requestId) {
        accessRequestService.revokeAccess(requestId);
        return ResponseEntity.ok("Request deleted successfully");
    }

    @GetMapping(path = "/all-patient-requests")
    public ResponseEntity<List<AccessRequest>> getAllPatientRequests() {
        List<AccessRequest> accessRequests = accessRequestService.getAllPatientRequests();
        return ResponseEntity.ok(accessRequests);
    }


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
