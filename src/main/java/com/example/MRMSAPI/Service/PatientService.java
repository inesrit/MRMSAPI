package com.example.MRMSAPI.Service;

import com.example.MRMSAPI.Dto.LoginDTO;
import com.example.MRMSAPI.Entity.Patient;
import com.example.MRMSAPI.Entity.User;
import com.example.MRMSAPI.Repo.PatientRepo;
import com.example.MRMSAPI.response.LoginResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepo patientRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private HttpServletRequest request;

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
                patient.getUser()

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
                    return new LoginResponse("Login Successful", true);
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


    public void updatePatientDetails(Patient loggedInPatient, Patient updatedPatient) {
        loggedInPatient.setPatientName(updatedPatient.getPatientName());
        loggedInPatient.setEmail(updatedPatient.getEmail());
        loggedInPatient.setPassword(this.passwordEncoder.encode(updatedPatient.getPassword()));
        loggedInPatient.setAddress(updatedPatient.getAddress());
        loggedInPatient.setContactNumber(updatedPatient.getContactNumber());
        loggedInPatient.setBirthDate(updatedPatient.getBirthDate());
        loggedInPatient.setWeight(updatedPatient.getWeight());
        loggedInPatient.setHeight(updatedPatient.getHeight());
        loggedInPatient.setHealthcareId(updatedPatient.getHealthcareId());
        loggedInPatient.setEmergencyContactName(updatedPatient.getEmergencyContactName());
        loggedInPatient.setEmergencyContactNumber(updatedPatient.getEmergencyContactNumber());
        patientRepo.save(loggedInPatient);
    }


    public void deletePatient(Patient loggedInPatient) {
        patientRepo.delete(loggedInPatient);
    }
}
