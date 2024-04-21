package com.example.MRMSAPI.Controller;


import com.example.MRMSAPI.Entity.AccessRequest;
import com.example.MRMSAPI.Entity.MedicalRecord;
import com.example.MRMSAPI.Entity.Patient;
import com.example.MRMSAPI.Enum.RequestStatus;
import com.example.MRMSAPI.Service.AccessRequestService;
import com.example.MRMSAPI.Service.PatientService;
import com.example.MRMSAPI.Service.MedicalRecordService;
import com.example.MRMSAPI.Entity.User;
import com.example.MRMSAPI.Service.UserService;
import jakarta.servlet.http.HttpSession;
//import org.hibernate.mapping.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("api/v1/medical-record")
public class MedicalRecordController {

    @Autowired
    private MedicalRecordService medicalRecordService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private UserService userService;

    @Autowired
    private HttpSession session;

    @PostMapping("/create")
    public ResponseEntity<String> createMedicalRecord(@RequestBody Map<String, Object> requestBody) {
        int patientId = (int) requestBody.get("patientId");
        int userId = (int) requestBody.get("userId");
        String recordDate = (String) requestBody.get("recordDate");
        String recordName = (String) requestBody.get("recordName");
        String recordType = (String) requestBody.get("recordType");
        String recordResult = (String) requestBody.get("recordResult");

        Patient patient = patientService.getPatientDetailsById(patientId);
        if (patient == null) {
            return ResponseEntity.badRequest().body("Patient with ID " + patientId + " not found");
        }
        User user = userService.getUserDetailsById(userId);
        if (user == null) {
            return ResponseEntity.badRequest().body("User with ID " + userId + " not found");
        }
        MedicalRecord newMedicalRecord = medicalRecordService.createMedicalRecord(patient, user, recordDate, recordName, recordType, recordResult);
        return ResponseEntity.ok().body("Medical record created successfully");
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateMedicalRecord(@RequestBody MedicalRecord medicalRecord) {
        medicalRecordService.updateMedicalRecord(medicalRecord);
        return ResponseEntity.ok().body("Medical record updated successfully");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteMedicalRecord(@RequestParam int medicalRecordId) {
        medicalRecordService.deleteMedicalRecord(medicalRecordId);
        return ResponseEntity.ok().body("Medical record deleted successfully");
    }

    @GetMapping("/record-details")
    public ResponseEntity<MedicalRecord> getRecordDetailsById(@RequestParam int medicalRecordId) {
        MedicalRecord medicalRecord = medicalRecordService.getMedicalRecordById(medicalRecordId);
        return ResponseEntity.ok().body(medicalRecord);
    }

    @GetMapping("/all-records")
    public ResponseEntity<List<MedicalRecord>> getAllRecords() {
        List<MedicalRecord> medicalRecords = medicalRecordService.getAllMedicalRecords();
        return ResponseEntity.ok().body(medicalRecords);
    }

    @GetMapping("/all-patient-records")
    public ResponseEntity<List<MedicalRecord>> getAllPatientRecords(@RequestParam int patientId) {
        List<MedicalRecord> patientRecords = medicalRecordService.getAllMedicalRecordsByPatientId(patientId);
        return ResponseEntity.ok().body(patientRecords);
    }

    @GetMapping("/all-user-records")
    public ResponseEntity<List<MedicalRecord>> getAllUserRecords(@RequestParam int userId) {
        List<MedicalRecord> userRecords = medicalRecordService.getAllMedicalRecordsByUserId(userId);
        return ResponseEntity.ok().body(userRecords);
    }

}
