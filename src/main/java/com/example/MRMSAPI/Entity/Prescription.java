package com.example.MRMSAPI.Entity;
import com.example.MRMSAPI.Enum.RequestStatus;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name="prescription")
public class Prescription {

    @Id
    @Column(name = "prescription_id", length = 45)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int prescriptionid;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false) // Every prescription belongs to one patient
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) // Every prescription is associated with one user
    private User user;

    @Column(name = "px_name", length = 255)
    private String pxName;

    @Column(name = "px_dose", length = 255)
    private String pxDose;

    @Column(name = "px_frequency", length = 255)
    private String pxFrequency;

    @Column(name = "px_quantity", length = 255)
    private String pxQuantity;

    @Column(name = "px_condition", length = 255)
    private String pxCondition;

    @Column(name = "px_date", length = 255)
    private String pxDate;

    @Column(name = "px_status", length = 255)
    @Enumerated(EnumType.STRING)
    private RequestStatus pxStatus;

    public Prescription() {
    }

    public Prescription(int prescriptionid, Patient patient, User user, String pxName, String pxDose, String pxFrequency, String pxQuantity, String pxCondition, String pxDate, RequestStatus pxStatus) {
        this.prescriptionid = prescriptionid;
        this.patient = patient;
        this.user = user;
        this.pxName = pxName;
        this.pxDose = pxDose;
        this.pxFrequency = pxFrequency;
        this.pxQuantity = pxQuantity;
        this.pxCondition = pxCondition;
        this.pxDate = pxDate;
        this.pxStatus = pxStatus;
    }

    public int getPrescriptionid() {
        return prescriptionid;
    }

    public void setPrescriptionid(int prescriptionid) {
        this.prescriptionid = prescriptionid;
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

    public String getPxName() {
        return pxName;
    }

    public void setPxName(String pxName) {
        this.pxName = pxName;
    }

    public String getPxDose() {
        return pxDose;
    }

    public void setPxDose(String pxDose) {
        this.pxDose = pxDose;
    }

    public String getPxFrequency() {
        return pxFrequency;
    }

    public void setPxFrequency(String pxFrequency) {
        this.pxFrequency = pxFrequency;
    }

    public String getPxQuantity() {
        return pxQuantity;
    }

    public void setPxQuantity(String pxQuantity) {
        this.pxQuantity = pxQuantity;
    }

    public String getPxCondition() {
        return pxCondition;
    }

    public void setPxCondition(String pxCondition) {
        this.pxCondition = pxCondition;
    }

    public String getPxDate() {
        return pxDate;
    }

    public void setPxDate(String pxDate) {
        this.pxDate = pxDate;
    }

    public RequestStatus getPxStatus() {
        return pxStatus;
    }

    public void setPxStatus(RequestStatus pxStatus) {
        this.pxStatus = pxStatus;
    }

    @Override
    public String toString() {
        return "Prescription{" +
                "prescriptionid=" + prescriptionid +
                ", patient=" + patient +
                ", user=" + user +
                ", pxName='" + pxName + '\'' +
                ", pxDose='" + pxDose + '\'' +
                ", pxFrequency='" + pxFrequency + '\'' +
                ", pxQuantity=" + pxQuantity + '\'' +
                ", pxCondition='" + pxCondition + '\'' +
                ", pxDate='" + pxDate + '\'' +
                ", pxStatus=" + pxStatus +
                '}';
    }
}
