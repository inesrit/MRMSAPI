package com.example.MRMSAPI.Entity;

import jakarta.persistence.*;

@Entity
@Table(name="medicalrecord")
public class MedicalRecord {

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

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user; // Added User association

    @Column(name = "record_result", length = 255)
    private String recordResult;


}
