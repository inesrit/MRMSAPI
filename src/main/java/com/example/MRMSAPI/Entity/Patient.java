package com.example.MRMSAPI.Entity;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name="patient")
public class Patient {

    @Id
    @Column(name = "patient_id", length = 45)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int patientid;
    @Column(name = "patient_name", length = 255)
    private String patientName;
    @Column(name = "email", length = 255)
    private String email;

    @Column(name = "password", length = 255)
    private String password;
    @Column(name = "address", length = 255)
    private String address;

    @Column(name = "contact_number", length = 45)
    private String contactNumber;

    @Column(name = "birth_date", length = 255)
    private String birthDate;

    @Column(name = "weight", length = 45)
    private int weight;

    @Column(name = "height", length = 45)
    private int height;
    @Column(name = "healthcare_id", length = 255)
    private String healthcareId;

    @Column(name = "emergency_contact_name", length = 255)
    private String emergencyContactName;

    @Column(name = "emergency_contact_number", length = 255)
    private int emergencyContactNumber;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true) // Assuming the column name in the patient table
    private User user; // Added User association

    public Patient(int patientid, String patientName, String email, String password, String address, String contactNumber, String birthDate, int weight, int height, String healthcareId, String emergencyContactName, int emergencyContactNumber, User user) {
        this.patientid = patientid;
        this.patientName = patientName;
        this.email = email;
        this.password = password;
        this.address = address;
        this.contactNumber = contactNumber;
        this.birthDate = birthDate;
        this.weight = weight;
        this.height = height;
        this.healthcareId = healthcareId;
        this.emergencyContactName = emergencyContactName;
        this.emergencyContactNumber = emergencyContactNumber;
        this.user = user;
    }

    public Patient() {
    }

    public int getPatientid() {
        return patientid;
    }

    public void setPatientid(int patientid) {
        this.patientid = patientid;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public String getHealthcareId() {
        return healthcareId;
    }

    public void setHealthcareId(String healthcareId) {
        this.healthcareId = healthcareId;
    }

    public String getEmergencyContactName() {
        return emergencyContactName;
    }

    public void setEmergencyContactName(String emergencyContactName) {
        this.emergencyContactName = emergencyContactName;
    }

    public int getEmergencyContactNumber() {
        return emergencyContactNumber;
    }


    public void setEmergencyContactNumber(int emergencyContactNumber) {
        this.emergencyContactNumber = emergencyContactNumber;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Patient{" +
                "patientid=" + patientid +
                ", patientName='" + patientName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", address='" + address + '\'' +
                ", contactNumber='" + contactNumber + '\'' +
                ", birthDate='" + birthDate + '\'' +
                ", weight=" + weight +
                ", height=" + height +
                ", healthcareId='" + healthcareId + '\'' +
                ", emergencyContactName='" + emergencyContactName + '\'' +
                ", emergencyContactNumber=" + emergencyContactNumber +
                ", user=" + user +
                '}';
    }
}
