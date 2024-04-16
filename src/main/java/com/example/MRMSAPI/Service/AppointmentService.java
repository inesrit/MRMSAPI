package com.example.MRMSAPI.Service;

import com.example.MRMSAPI.Entity.*;
import com.example.MRMSAPI.Enum.RequestStatus;
import com.example.MRMSAPI.Repo.AccessRequestRepo;
import com.example.MRMSAPI.Repo.AppointmentRepo;
import com.example.MRMSAPI.Repo.PrescriptionRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.time.*;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepo appointmentRepo;

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private UserService userService;

    @Autowired
    private PatientService patientService;

    public Appointment createAppointment(Patient patient, User user, String visitType, String appLocation, String appDate, String appTime, String appComments) {
        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setUser(user);
        appointment.setVisitType(visitType);
        appointment.setAppLocation(appLocation);
        appointment.setAppDate(LocalDate.parse(appDate));
        appointment.setAppTime(LocalTime.parse(appTime));
        appointment.setAppComments(appComments);
        appointment.setAppStatus(RequestStatus.PENDING);

        return appointmentRepo.save(appointment);
    }

    public void updateAppointment(Appointment appointment) {
        Appointment existingAppointment = appointmentRepo.findById(appointment.getAppointmentid())
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found"));

        existingAppointment.setVisitType(appointment.getVisitType());
        existingAppointment.setAppLocation(appointment.getAppLocation());
        existingAppointment.setAppDate(appointment.getAppDate());
        existingAppointment.setAppTime(appointment.getAppTime());
        existingAppointment.setAppComments(appointment.getAppComments());
        existingAppointment.setAppStatus(appointment.getAppStatus());

        appointmentRepo.save(existingAppointment);
    }

    public void updateAppointmentStatus(int appointmentId, RequestStatus status) {
        Appointment appointment = appointmentRepo.findById(appointmentId)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found"));
        appointment.setAppStatus(status);
        appointmentRepo.save(appointment);
    }

    public void deleteAppointment(int appointmentId) {
        try {
            appointmentRepo.deleteByAppointmentId(appointmentId);
        } catch (EmptyResultDataAccessException e) {
            throw new EntityNotFoundException("Appointment with ID " + appointmentId + " not found");
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to delete appointment");
        }
    }

    public Appointment getAppointmentDetailsById(int appointmentId) {
        return appointmentRepo.findById(appointmentId)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found"));
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepo.findAll();
    }

    public List<Appointment> getAllAppointmentsByPatientId(int patientId) {
        return appointmentRepo.findAllByPatient_Patientid(patientId);
    }

    public List<Appointment> getAllAppointmentsByUserId(int userId) {
        return appointmentRepo.findAllByUser_Userid(userId);
    }

    public boolean hasAppointmentOverlap(List<Appointment> appointments, String newAppDate, String newAppTime) {
        // Convert newAppTime string to LocalTime
        LocalTime newStartTime = LocalTime.parse(newAppTime);
        LocalTime newEndTime = newStartTime.plusHours(2);

        // Convert newAppDate string to LocalDate
        LocalDate newDate = LocalDate.parse(newAppDate);

        // Check for overlap with each existing appointment
        for (Appointment appointment : appointments) {
            // Convert existing appointment time string to LocalTime
            LocalTime existingStartTime = appointment.getAppTime();
            LocalTime existingEndTime = existingStartTime.plusHours(2);

            // Convert existing appointment date string to LocalDate
            LocalDate existingDate = appointment.getAppDate();

            // Check for date overlap first
            if (existingDate.equals(newDate)) {
                // Check for time overlap
                if ((newStartTime.isBefore(existingEndTime) && newEndTime.isAfter(existingStartTime)) ||
                        (existingStartTime.isBefore(newEndTime) && existingEndTime.isAfter(newStartTime))) {
                    return true;
                }
            }
        }
        // No overlap found
        return false;
    }


    public List<String> getUserAvailableTimes(int userId, String date) {
        // Parse the date string into LocalDate
        LocalDate specifiedDate = LocalDate.parse(date);

        // Get all appointments for the specified user on the specified date
        List<Appointment> userAppointments = appointmentRepo.findAllByUser_UseridAndAppDate(userId, specifiedDate);

        // Create a list to store available times
        List<String> availableTimes = new ArrayList<>();

        // Define the start and end times for appointments (9am to 5pm)
        LocalTime startTime = LocalTime.of(9, 0);
        LocalTime endTime = LocalTime.of(17, 0);

        // Initialize the current time to the start time
        LocalTime currentTime = startTime;

        // Iterate over the appointments to find available slots
        for (Appointment appointment : userAppointments) {
            // Get the time of the appointment
            LocalTime appointmentTime = appointment.getAppTime();

            // If there's a gap between the current time and the appointment time, add the gap as available time
            if (currentTime.isBefore(appointmentTime)) {
                availableTimes.add(currentTime.toString() + " - " + appointmentTime.toString());
            }

            // Update the current time to the end of the current appointment
            currentTime = appointmentTime.plusHours(2); // Assuming appointments are 2 hours long
        }

        // Check if there's available time after the last appointment until the end time
        if (currentTime.isBefore(endTime)) {
            availableTimes.add(currentTime.toString() + " - " + endTime.toString());
        }

        return availableTimes;
    }

}
