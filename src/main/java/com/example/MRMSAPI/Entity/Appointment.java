package com.example.MRMSAPI.Entity;
import com.example.MRMSAPI.Enum.RequestStatus;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name="appointment")
public class Appointment {

    @Id
    @Column(name = "appointment_id", length = 45)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int appointmentid;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false) // Every prescription belongs to one patient
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) // Every prescription is associated with one user
    private User user;

    @Column(name = "visit_type", length = 255)
    private String visitType;

    @Column(name = "app_location", length = 255)
    private String appLocation;

    @Column(name = "app_date")
    private LocalDate appDate;

    @Column(name = "app_time")
    private LocalTime appTime;

    @Column(name = "app_comments", length = 255)
    private String appComments;

    @Column(name = "app_status", length = 255)
    @Enumerated(EnumType.STRING)
    private RequestStatus appStatus;


    public Appointment() {
    }

    public Appointment(int appointmentid, Patient patient, User user, String visitType, String appLocation, LocalDate appDate, LocalTime appTime, String appComments, RequestStatus appStatus) {
        this.appointmentid = appointmentid;
        this.patient = patient;
        this.user = user;
        this.visitType = visitType;
        this.appLocation = appLocation;
        this.appDate = appDate;
        this.appTime = appTime;
        this.appComments = appComments;
        this.appStatus = appStatus;
    }

    public int getAppointmentid() {
        return appointmentid;
    }

    public void setAppointmentid(int appointmentid) {
        this.appointmentid = appointmentid;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getVisitType() {
        return visitType;
    }

    public void setVisitType(String visitType) {
        this.visitType = visitType;
    }

    public String getAppLocation() {
        return appLocation;
    }

    public void setAppLocation(String appLocation) {
        this.appLocation = appLocation;
    }

    public LocalDate getAppDate() {
        return appDate;
    }

    public void setAppDate(LocalDate appDate) {
        this.appDate = appDate;
    }

    public LocalTime getAppTime() {
        return appTime;
    }

    public void setAppTime(LocalTime appTime) {
        this.appTime = appTime;
    }

    public String getAppComments() {
        return appComments;
    }

    public void setAppComments(String appComments) {
        this.appComments = appComments;
    }

    public RequestStatus getAppStatus() {
        return appStatus;
    }

    public void setAppStatus(RequestStatus appStatus) {
        this.appStatus = appStatus;
    }

    @Override
    public String toString() {
        return "Appointment{" +
                "appointmentid=" + appointmentid +
                ", patient=" + patient +
                ", user=" + user +
                ", visitType='" + visitType + '\'' +
                ", appLocation='" + appLocation + '\'' +
                ", appDate=" + appDate +
                ", appTime=" + appTime +
                ", appComments='" + appComments + '\'' +
                ", appStatus=" + appStatus +
                '}';
    }
}
