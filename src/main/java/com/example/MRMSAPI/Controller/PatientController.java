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

@RestController
@CrossOrigin
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
    public ResponseEntity<String> logoutUser() {
        session.invalidate(); // Invalidate session upon logout
        return ResponseEntity.ok("Logout Successful");
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

}
