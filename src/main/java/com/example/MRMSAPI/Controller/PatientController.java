package com.example.MRMSAPI.Controller;


import com.example.MRMSAPI.Entity.User;
import com.example.MRMSAPI.Service.PatientService;
import com.example.MRMSAPI.Dto.LoginDTO;
import com.example.MRMSAPI.Entity.Patient;
import com.example.MRMSAPI.response.LoginResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
Patient rest API controller
*/

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("api/v1/patient")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @Autowired
    private HttpSession session;

    @PostMapping(path = "/save")
    public String savePatient(@RequestBody Patient patient)
    {
        String id = patientService.addPatient(patient);
        return id;
    }
    @PostMapping(path = "/login")
    public ResponseEntity<?> loginPatient(@RequestBody LoginDTO loginDTO)
    {
        LoginResponse loginResponse = patientService.loginPatient(loginDTO);
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping(path = "/logout")
    public ResponseEntity<String> logoutPatient() {
        session.invalidate(); // Invalidate session upon logout
        return ResponseEntity.ok("Logout Successful");
    }

    @GetMapping(path = "/current-patient-id")
    public ResponseEntity<Integer> getCurrentPatientId() {
        Patient loggedInPatient = (Patient) session.getAttribute("loggedInPatient");
        if (loggedInPatient != null) {
            return ResponseEntity.ok(loggedInPatient.getPatientid());
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping(path = "/update")
    public ResponseEntity<String> updatePatientDetails(@RequestBody Patient updatedPatient) {
        Patient loggedPatient = (Patient) session.getAttribute("loggedInPatient");
        if (loggedPatient != null) {
            patientService.updatePatientDetails(loggedPatient, updatedPatient);
            return ResponseEntity.ok("Patient details updated successfully");
        } else {
            return ResponseEntity.badRequest().body("Patient not logged in or unauthorized to perform this action");
        }
    }


    @DeleteMapping(path = "/delete")
    public ResponseEntity<String> deletePatient() {
        Patient loggedInPatient = (Patient) session.getAttribute("loggedInPatient");
        if (loggedInPatient != null) {
            patientService.deletePatient(loggedInPatient);
            session.invalidate();
            return ResponseEntity.ok("Patients details deleted successfully");

        } else {
            return ResponseEntity.badRequest().body("Patient not logged in or unauthorized to perform this action");
        }
    }



    @GetMapping(path = "/details")
    public ResponseEntity<Patient> getLoggedInPatientDetails() {
        Patient loggedInPatient = patientService.getLoggedInPatientDetails();
        return ResponseEntity.ok(loggedInPatient);
    }


    @GetMapping(path = "/patient-details")
    public ResponseEntity<Patient> getPatientDetailsById(@RequestParam int patientId) {
        Patient patient = patientService.getPatientDetailsById(patientId);
        if (patient != null) {
            return ResponseEntity.ok(patient);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/all")
    public ResponseEntity<List<Patient>> getAllPatients() {
        List<Patient> patients = patientService.getAllPatients();
        return ResponseEntity.ok(patients);
    }
}
