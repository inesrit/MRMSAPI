package com.example.MRMSAPI.Entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name="medicalrecords")
public class MedicalRecords {

    @Id
    @Column(name = "medicalrecord_id", length = 45)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int medicalrecordid;

    @Column(name = "patient_id", length = 45)
    private int patientid;

    @Column(name = "record_date", length = 255)
    private String recordDate;

    @Column(name = "record_name", length = 255)
    private String recordName;

    @Column(name = "record_type", length = 255)
    private String recordType;

    @Column(name = "provider", length = 255)
    private String provider;

    @Column(name = "record_result", length = 255)
    private String recordResult;


}
