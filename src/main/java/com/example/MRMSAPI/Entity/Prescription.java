package com.example.MRMSAPI.Entity;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name="prescription")
public class Prescription {

    @Id
    @Column(name = "prescription_id", length = 45)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int prescriptionid;

    @Column(name = "patient_id", length = 45)
    private int patientid;

    @Column(name = "px_dose", length = 255)
    private String pxDose;

    @Column(name = "px_frequency", length = 255)
    private String pxFrequency;

    @Column(name = "px_quantity", length = 45)
    private int pxQuantity;

    @Column(name = "px_condition", length = 255)
    private String pxCondition;

    @Column(name = "provider", length = 255)
    private String provider;

    @Column(name = "px_date", length = 255)
    private String pxDate;

    @Column(name = "px_status", length = 255)
    private String pxStatus;
}
