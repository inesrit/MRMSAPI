package com.example.MRMSAPI.Service;

import com.example.MRMSAPI.Dto.LoginDTO;
import com.example.MRMSAPI.Entity.MedicalRecord;
import com.example.MRMSAPI.Entity.Patient;
import com.example.MRMSAPI.Entity.Prescription;
import com.example.MRMSAPI.Entity.User;
import com.example.MRMSAPI.Entity.Appointment;
import com.example.MRMSAPI.Repo.AppointmentRepo;
import com.example.MRMSAPI.Repo.PatientRepo;
import com.example.MRMSAPI.response.LoginResponse;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/*
Patient service class
*/

@Service
public class PatientService {

    private List<User> user = new ArrayList<>();

    private List<MedicalRecord> medicalrecord = new ArrayList<>();

    private List<Prescription> prescriptions = new ArrayList<>();

    private List<Appointment> appointments = new ArrayList<>();

    @Autowired
    private PatientRepo patientRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private HttpServletRequest request;

    @Autowired
    HttpServletResponse response;

    public String addPatient(Patient patient) {

        Patient patient1 = new Patient(
                patient.getPatientid(),
                patient.getPatientName(),
                patient.getEmail(),
                this.passwordEncoder.encode(patient.getPassword()),
                patient.getAddress(),
                patient.getContactNumber(),
                patient.getBirthDate(),
                patient.getWeight(),
                patient.getHeight(),
                patient.getHealthcareId(),
                patient.getEmergencyContactName(),
                patient.getEmergencyContactNumber(),
                user,
                medicalrecord,
                prescriptions,
                appointments

        );

        patientRepo.save(patient1);
        return patient.getPatientName();
    }


    public LoginResponse loginPatient(LoginDTO loginDTO) {
        String msg = "";
        Patient patient1 = patientRepo.findByEmail(loginDTO.getEmail());
        if (patient1 != null) {
            String password = loginDTO.getPassword();
            String encodedPassword = patient1.getPassword();
            Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
            if (isPwdRight) {
                Optional<Patient> patient = patientRepo.findOneByEmailAndPassword(loginDTO.getEmail(), encodedPassword);
                if (patient.isPresent()) {
                    HttpSession session = request.getSession(true);
                    session.setAttribute("loggedInPatient", patient1);
                    Cookie cookiepatient = new Cookie("patient", String.valueOf(patient1.getPatientid()));
                    cookiepatient.setHttpOnly(true);
                    cookiepatient.setSecure(false);
                    response.addCookie(cookiepatient);
                    return new LoginResponse("Login Successful", true, patient1);
                } else {
                    return new LoginResponse("Login Failed", false);
                }
            } else {
                return new LoginResponse("Password does not match", false);
            }
        }else {
            return new LoginResponse("Email does not exit", false);
        }
    }


    public void updatePatientDetails(Patient updatedPatient) {
        Patient existingPatient = patientRepo.findById(updatedPatient.getPatientid())
                .orElseThrow(() -> new EntityNotFoundException("patient  not found"));
        existingPatient.setPatientName(updatedPatient.getPatientName());
        existingPatient.setEmail(updatedPatient.getEmail());
        existingPatient.setPassword(this.passwordEncoder.encode(updatedPatient.getPassword()));
        existingPatient.setAddress(updatedPatient.getAddress());
        existingPatient.setContactNumber(updatedPatient.getContactNumber());
        existingPatient.setBirthDate(updatedPatient.getBirthDate());
        existingPatient.setWeight(updatedPatient.getWeight());
        existingPatient.setHeight(updatedPatient.getHeight());
        existingPatient.setHealthcareId(updatedPatient.getHealthcareId());
        existingPatient.setEmergencyContactName(updatedPatient.getEmergencyContactName());
        existingPatient.setEmergencyContactNumber(updatedPatient.getEmergencyContactNumber());
        patientRepo.save(existingPatient);
    }


    public void deletePatient(Patient loggedInPatient) {
        patientRepo.delete(loggedInPatient);
    }


    public Patient getLoggedInPatientDetails() {
        HttpSession session = request.getSession(true);
        return (Patient) session.getAttribute("loggedInPatient");
    }

    public Patient getPatientDetailsById(int patientId) {
        return patientRepo.findById(patientId).orElse(null);
    }


    public void addUserToPatient(User user, Patient patient) {
        List<User> users = patient.getUsers();
        if (!users.contains(user)) {
            users.add(user);
            patient.setUsers(users);
            patientRepo.save(patient);
        }
    }

    public void removeUserFromPatient(User user, Patient patient) {
        List<User> users = patient.getUsers();
        users.remove(user);
        patient.setUsers(users);
        patientRepo.save(patient);
    }

    public List<Patient> getAllPatients() {
        return patientRepo.findAll();
    }
}
