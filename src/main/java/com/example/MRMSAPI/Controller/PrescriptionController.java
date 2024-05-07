package com.example.MRMSAPI.Controller;

import com.example.MRMSAPI.Entity.*;
import com.example.MRMSAPI.Enum.RequestStatus;
import com.example.MRMSAPI.Service.*;
import jakarta.servlet.http.HttpSession;
//import org.hibernate.mapping.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/*
Prescription rest API controller
*/

@RestController
@CrossOrigin(origins = "https://appmrms-49191739e0bc.herokuapp.com", allowCredentials = "true")
@RequestMapping("api/v1/prescription")
public class PrescriptionController {

    @Autowired
    private PrescriptionService prescriptionService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private UserService userService;

    @Autowired
    private HttpSession session;

    @PostMapping("/create")
    public ResponseEntity<String> createPrescription(@RequestBody Map<String, Object> requestBody) {
        int patientId = (int) requestBody.get("patientId");
        int userId = (int) requestBody.get("userId");
        String pxName = (String) requestBody.get("pxName");
        String pxDose = (String) requestBody.get("pxDose");
        String pxFrequency = (String) requestBody.get("pxFrequency");
        String pxQuantity = (String) requestBody.get("pxQuantity");
        String pxCondition = (String) requestBody.get("pxCondition");
        String pxDate = (String) requestBody.get("pxDate");

        Patient patient = patientService.getPatientDetailsById(patientId);
        if (patient == null) {
            return ResponseEntity.badRequest().body("Patient with ID " + patientId + " not found");
        }
        User user = userService.getUserDetailsById(userId);
        if (user == null) {
            return ResponseEntity.badRequest().body("User with ID " + userId + " not found");
        }
        Prescription newPrescription = prescriptionService.createPrescription(patient, user, pxName, pxDose, pxFrequency, pxQuantity, pxCondition, pxDate);
        return ResponseEntity.ok().body("Prescription created successfully");
    }

    @PutMapping("/update")
    public ResponseEntity<String> updatePrescription(@RequestBody Prescription prescription) {
        prescriptionService.updatePrescription(prescription);
        return ResponseEntity.ok().body("Prescription updated successfully");
    }

    @PutMapping("/update-status")
    public ResponseEntity<String> updatePrescriptionStatus(@RequestParam int prescriptionId, @RequestParam RequestStatus status) {
        prescriptionService.updatePrescriptionStatus(prescriptionId, status);
        return ResponseEntity.ok("Request status updated successfully");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deletePrescription(@RequestParam int prescriptionId) {
        prescriptionService.deletePrescription(prescriptionId);
        return ResponseEntity.ok().body("Prescription deleted successfully");
    }

    @GetMapping("/prescription-details")
    public ResponseEntity<Prescription> getPrescriptionDetailsById(@RequestParam int prescriptionId) {
        Prescription prescription = prescriptionService.getPrescriptionDetailsById(prescriptionId);
        return ResponseEntity.ok().body(prescription);
    }

    @GetMapping("/all-prescriptions")
    public ResponseEntity<List<Prescription>> getAllPrescriptions() {
        List<Prescription> prescriptions = prescriptionService.getAllPrescriptions();
        return ResponseEntity.ok().body(prescriptions);
    }

    @GetMapping("/all-patient-prescriptions")
    public ResponseEntity<List<Prescription>> getAllPrescriptionsByPatientId(@RequestParam int patientId) {
        List<Prescription> patientPrescriptions = prescriptionService.getAllPrescriptionsByPatientId(patientId);
        return ResponseEntity.ok().body(patientPrescriptions);
    }

    @GetMapping("/all-user-prescriptions")
    public ResponseEntity<List<Prescription>> getAllPrescriptionsByUserId(@RequestParam int userId) {
        List<Prescription> userPrescriptions = prescriptionService.getAllPrescriptionsByUserId(userId);
        return ResponseEntity.ok().body(userPrescriptions);
    }



}
