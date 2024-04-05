package com.example.MRMSAPI.Service;

import com.example.MRMSAPI.Dto.LoginDTO;
import com.example.MRMSAPI.Entity.MedicalRecord;
import com.example.MRMSAPI.Entity.Patient;
import com.example.MRMSAPI.Entity.Prescription;
import com.example.MRMSAPI.Entity.User;
import com.example.MRMSAPI.Repo.MedicalRecordRepo;
import com.example.MRMSAPI.Repo.UserRepo;
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
public class UserService {

    private List<Patient> patients = new ArrayList<>();

    private List<MedicalRecord> medicalrecord = new ArrayList<>();

    private List<Prescription> prescriptions = new ArrayList<>();

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private HttpServletRequest request;

    public String addUser(User user) {

        User user1 = new User(
                user.getUserid(),
                user.getUsername(),
                user.getEmail(),
                this.passwordEncoder.encode(user.getPassword()),
                user.getLocation(),
                user.getContactNumber(),
                patients,
                medicalrecord,
                prescriptions
        );

        userRepo.save(user1);
        return user.getUsername();
    }


    public LoginResponse loginUser(LoginDTO loginDTO) {
        String msg = "";
        User user1 = userRepo.findByEmail(loginDTO.getEmail());
        if (user1 != null) {
            String password = loginDTO.getPassword();
            String encodedPassword = user1.getPassword();
            Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
            if (isPwdRight) {
                Optional<User> user = userRepo.findOneByEmailAndPassword(loginDTO.getEmail(), encodedPassword);
                if (user.isPresent()) {
                    HttpSession session = request.getSession(true);
                    session.setAttribute("loggedInUser", user1);
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


    public void updateUserDetails(User loggedInUser, User updatedUser) {
        loggedInUser.setUsername(updatedUser.getUsername());
        loggedInUser.setEmail(updatedUser.getEmail());
        loggedInUser.setPassword(this.passwordEncoder.encode(updatedUser.getPassword()));
        loggedInUser.setLocation(updatedUser.getLocation());
        loggedInUser.setContactNumber(updatedUser.getContactNumber());
        userRepo.save(loggedInUser);
    }

    public void deleteUser(User loggedInUser) {
            userRepo.delete(loggedInUser);
    }

    public User getLoggedInUserDetails() {
        HttpSession session = request.getSession(true);
        return (User) session.getAttribute("loggedInUser");
    }

    public User getUserDetailsById(int userId) {
        return userRepo.findById(userId).orElse(null);
    }


    public void addPatientToUser(User user, Patient patient) {
        List<Patient> patients = user.getPatients();
        if (!patients.contains(patient)) {
            patients.add(patient);
            user.setPatients(patients);
            userRepo.save(user);
        }
    }

    public void removePatientFromUser(User user, Patient patient) {
        List<Patient> patients = user.getPatients();
        patients.remove(patient);
        user.setPatients(patients);
        userRepo.save(user);
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }
}
