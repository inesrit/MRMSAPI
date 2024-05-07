package com.example.MRMSAPI.Controller;


import com.example.MRMSAPI.Entity.User;
import com.example.MRMSAPI.Repo.PatientRepo;
import com.example.MRMSAPI.Service.PatientService;
import com.example.MRMSAPI.Dto.LoginDTO;
import com.example.MRMSAPI.Entity.Patient;
import com.example.MRMSAPI.response.LoginResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
Patient rest API controller
*/

@RestController
@CrossOrigin(origins = "https://appmrms-49191739e0bc.herokuapp.com", allowCredentials = "true")
@RequestMapping("api/v1/patient")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @Autowired
    private HttpSession session;

    @Autowired
    HttpServletResponse response;

    @Autowired
    private PatientRepo patientRepo;

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
        Cookie cookiepatient = new Cookie("patient", null);
        cookiepatient.setHttpOnly(true);
        cookiepatient.setSecure(false);
        cookiepatient.setMaxAge(0);
        response.addCookie(cookiepatient);
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
            patientService.updatePatientDetails(updatedPatient);
            return ResponseEntity.ok("Patient details updated successfully");
    }


    @DeleteMapping(path = "/delete")
    public ResponseEntity<String> deletePatient(@RequestParam int patientId) {
        Patient loggedInPatient = patientService.getPatientDetailsById(patientId);
        if (loggedInPatient != null) {
            patientService.deletePatient(loggedInPatient);
            session.invalidate();
            return ResponseEntity.ok("Patients details deleted successfully");

        } else {
            return ResponseEntity.badRequest().body("Patient not found");
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
