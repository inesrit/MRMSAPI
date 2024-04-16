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

import java.time.*;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("api/v1/appointment")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private UserService userService;

    @Autowired
    private HttpSession session;


    @PostMapping("/create")
    public ResponseEntity<String> createAppointment(@RequestBody Map<String, Object> requestBody) {
        int patientId = (int) requestBody.get("patientId");
        int userId = (int) requestBody.get("userId");
        String visitType = (String) requestBody.get("visitType");
        String appLocation = (String) requestBody.get("appLocation");
        String appDate = (String) requestBody.get("appDate");
        String appTime = (String) requestBody.get("appTime");
        String appComments = (String) requestBody.get("appComments");

        Patient patient = patientService.getPatientDetailsById(patientId);
        if (patient == null) {
            return ResponseEntity.badRequest().body("Patient with ID " + patientId + " not found");
        }
        User user = userService.getUserDetailsById(userId);
        if (user == null) {
            return ResponseEntity.badRequest().body("User with ID " + userId + " not found");
        }

        if (!isValidAppointmentTime(appTime)) {
            return ResponseEntity.badRequest().body("Invalid appointment time");
        }

        // Check for overlapping appointments
        if (appointmentService.hasAppointmentOverlap(appointmentService.getAllAppointmentsByUserId(userId), appDate, appTime)) {
            return ResponseEntity.badRequest().body("Overlapping appointment found");
        }

        Appointment newAppointment = appointmentService.createAppointment(patient, user, visitType, appLocation, appDate, appTime, appComments);
        return ResponseEntity.ok().body("Appointment created successfully");
    }

    private boolean isValidAppointmentTime(String appTime) {
        return appTime.matches("^(0[9]|1[0-6]):[0-5][0-9]$");
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateAppointment(@RequestBody Appointment appointment) {
        appointmentService.updateAppointment(appointment);
        return ResponseEntity.ok().body("Appointment updated successfully");
    }

    @PutMapping("/update-status")
    public ResponseEntity<String> updateAppointmentStatus(@RequestParam int appointmentId, @RequestParam RequestStatus status) {
        appointmentService.updateAppointmentStatus(appointmentId, status);
        return ResponseEntity.ok("Appointment status updated successfully");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteAppointment(@RequestParam int appointmentId) {
        appointmentService.deleteAppointment(appointmentId);
        return ResponseEntity.ok().body("Appointment deleted successfully");
    }

    @GetMapping("/appointment-details")
    public ResponseEntity<Appointment> getAppointmentDetailsById(@RequestParam int appointmentId) {
        Appointment appointment = appointmentService.getAppointmentDetailsById(appointmentId);
        return ResponseEntity.ok().body(appointment);
    }

    @GetMapping("/all-appointments")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        List<Appointment> appointments = appointmentService.getAllAppointments();
        return ResponseEntity.ok().body(appointments);
    }

    @GetMapping("/all-patient-appointments")
    public ResponseEntity<List<Appointment>> getAllAppointmentsByPatientId(@RequestParam int patientId) {
        List<Appointment> patientAppointments = appointmentService.getAllAppointmentsByPatientId(patientId);
        return ResponseEntity.ok().body(patientAppointments);
    }

    @GetMapping("/all-user-appointments")
    public ResponseEntity<List<Appointment>> getAllAppointmentsByUserId(@RequestParam int userId) {
        List<Appointment> userAppointments = appointmentService.getAllAppointmentsByUserId(userId);
        return ResponseEntity.ok().body(userAppointments);
    }


    @GetMapping("/get-user-available-times")
    public ResponseEntity<List<String>> getUserAvailableTimes(@RequestParam int userId, String date) {
        List<String> availableTimes = appointmentService.getUserAvailableTimes(userId, date);
        return ResponseEntity.ok().body(availableTimes);
    }
}
