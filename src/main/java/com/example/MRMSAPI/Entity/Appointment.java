package com.example.MRMSAPI.Entity;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name="appointment")
public class Appointment {

    @Id
    @Column(name = "appointment_id", length = 45)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int appointmentid;

    @Column(name = "patient_id", length = 45)
    private int patientid;

    @Column(name = "visit_type", length = 255)
    private String visitType;

    @Column(name = "provider", length = 255)
    private String provider;

    @Column(name = "app_location", length = 255)
    private String appLocation;

    @Column(name = "app_date", length = 255)
    private String appDate;

    @Column(name = "app_comments", length = 255)
    private String appComments;

    @Column(name = "app_status", length = 255)
    private String appStatus;


}
