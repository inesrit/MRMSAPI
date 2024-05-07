package com.example.MRMSAPI.Entity;

import jakarta.persistence.*;

/*
Medical record Entity class
*/
@Entity
@Table(name="medical_record")
public class MedicalRecord {

    @Id
    @Column(name = "medicalrecord_id", length = 45)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int medicalrecordid;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false) // Every medical record belongs to one patient
    private Patient patient;

    @Column(name = "record_date", length = 255)
    private String recordDate;

    @Column(name = "record_name", length = 255)
    private String recordName;

    @Column(name = "record_type", length = 255)
    private String recordType;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) // Every medical record is created by one user
    private User user;

    @Column(name = "record_result", length = 255)
    private String recordResult;


    public MedicalRecord() {
    }

    public MedicalRecord(int medicalrecordid, Patient patient, String recordDate, String recordName, String recordType, User user, String recordResult) {
        this.medicalrecordid = medicalrecordid;
        this.patient = patient;
        this.recordDate = recordDate;
        this.recordName = recordName;
        this.recordType = recordType;
        this.user = user;
        this.recordResult = recordResult;
    }

    public int getMedicalrecordid() {
        return medicalrecordid;
    }

    public void setMedicalrecordid(int medicalrecordid) {
        this.medicalrecordid = medicalrecordid;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public String getRecordDate() {
        return recordDate;
    }

    public void setRecordDate(String recordDate) {
        this.recordDate = recordDate;
    }

    public String getRecordName() {
        return recordName;
    }

    public void setRecordName(String recordName) {
        this.recordName = recordName;
    }

    public String getRecordType() {
        return recordType;
    }

    public void setRecordType(String recordType) {
        this.recordType = recordType;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getRecordResult() {
        return recordResult;
    }

    public void setRecordResult(String recordResult) {
        this.recordResult = recordResult;
    }

    @Override
    public String toString() {
        return "MedicalRecord{" +
                "medicalrecordid=" + medicalrecordid +
                ", patient=" + patient +
                ", recordDate='" + recordDate + '\'' +
                ", recordName='" + recordName + '\'' +
                ", recordType='" + recordType + '\'' +
                ", user=" + user +
                ", recordResult='" + recordResult + '\'' +
                '}';
    }
}
