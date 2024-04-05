package com.example.MRMSAPI.Entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import com.example.MRMSAPI.Entity.Patient;

import java.util.*;

@Entity
@Table(name="user")
public class User {

    @Id
    @Column(name = "user_id", length = 45)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int userid;

    @Column(name = "user_name", length = 255)
    private String username;

    @Column(name = "email", length = 255)
    private String email;

    @Column(name = "password", length = 255)
    private String password;

    @Column(name = "user_location", nullable = true)
    private String location;

    @Column(name = "user_contact_number", nullable = true)
    private String contactNumber;

    @JsonIgnore
    @ManyToMany(mappedBy = "users", fetch = FetchType.EAGER)
    private List<Patient> patients;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<MedicalRecord> medicalRecords = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Prescription> prescriptions = new ArrayList<>();


    public User() {
    }

    public User(int userid, String username, String email, String password, String location, String contactNumber, List<Patient> patients, List<MedicalRecord> medicalRecords, List<Prescription> prescriptions) {
        this.userid = userid;
        this.username = username;
        this.email = email;
        this.password = password;
        this.location = location;
        this.contactNumber = contactNumber;
        this.patients = patients;
        this.medicalRecords = medicalRecords;
        this.prescriptions = prescriptions;
    }

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public List<Patient> getPatients() {
        return patients;
    }

    public void setPatients(List<Patient> patients) {
        this.patients = patients;
    }

    public List<MedicalRecord> getMedicalRecords() {
        return medicalRecords;
    }

    public void setMedicalRecords(List<MedicalRecord> medicalRecords) {
        this.medicalRecords = medicalRecords;
    }

    public List<Prescription> getPrescriptions() {
        return prescriptions;
    }

    public void setPrescriptions(List<Prescription> prescriptions) {
        this.prescriptions = prescriptions;
    }

    @Override
    public String toString() {
        return "User{" +
                "userid=" + userid +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", location='" + location + '\'' +
                ", contactNumber='" + contactNumber + '\'' +
                ", patients=" + patients +
                ", medicalRecords=" + medicalRecords +
                ", prescriptions=" + prescriptions +
                '}';
    }
}
