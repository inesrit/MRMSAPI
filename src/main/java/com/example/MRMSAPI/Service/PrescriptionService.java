package com.example.MRMSAPI.Service;

import com.example.MRMSAPI.Entity.*;
import com.example.MRMSAPI.Enum.RequestStatus;
import com.example.MRMSAPI.Repo.AccessRequestRepo;
import com.example.MRMSAPI.Repo.PrescriptionRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PrescriptionService {

    @Autowired
    private PrescriptionRepo prescriptionRepo;

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private UserService userService;

    @Autowired
    private PatientService patientService;

    public Prescription createPrescription(Patient patient, User user, String pxName, String pxDose, String pxFrequency, String pxQuantity, String pxCondition, String pxDate) {
        Prescription prescription = new Prescription();
        prescription.setPatient(patient);
        prescription.setUser(user);
        prescription.setPxName(pxName);
        prescription.setPxDose(pxDose);
        prescription.setPxFrequency(pxFrequency);
        prescription.setPxQuantity(pxQuantity);
        prescription.setPxCondition(pxCondition);
        prescription.setPxDate(pxDate);
        prescription.setPxStatus(RequestStatus.PENDING);

        return prescriptionRepo.save(prescription);
    }


    public void updatePrescription(Prescription prescription) {
        Prescription existingPrescription = prescriptionRepo.findById(prescription.getPrescriptionid())
                .orElseThrow(() -> new EntityNotFoundException("Prescription not found"));

        existingPrescription.setPxName(prescription.getPxName());
        existingPrescription.setPxDose(prescription.getPxDose());
        existingPrescription.setPxFrequency(prescription.getPxFrequency());
        existingPrescription.setPxQuantity(prescription.getPxQuantity());
        existingPrescription.setPxCondition(prescription.getPxCondition());
        existingPrescription.setPxDate(prescription.getPxDate());
        existingPrescription.setPxStatus(prescription.getPxStatus());

        prescriptionRepo.save(existingPrescription);
    }


    public void updatePrescriptionStatus(int prescriptionId, RequestStatus status) {
        Prescription prescription = prescriptionRepo.findById(prescriptionId)
                .orElseThrow(() -> new EntityNotFoundException("Prescription not found"));
        prescription.setPxStatus(status);
        prescriptionRepo.save(prescription);
    }

    public void deletePrescription(int prescriptionId) {
        try {
            prescriptionRepo.deleteByPrescriptionId(prescriptionId);
        } catch (EmptyResultDataAccessException e) {
            throw new EntityNotFoundException("Prescription with ID " + prescriptionId + " not found");
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to delete prescription");
        }
    }

    public Prescription getPrescriptionDetailsById(int prescriptionId) {
        return prescriptionRepo.findById(prescriptionId)
                .orElseThrow(() -> new EntityNotFoundException("Prescription not found"));
    }

    public List<Prescription> getAllPrescriptions() {
        return prescriptionRepo.findAll();
    }

    public List<Prescription> getAllPrescriptionsByPatientId(int patientId) {
        return prescriptionRepo.findAllByPatient_Patientid(patientId);
    }

}
