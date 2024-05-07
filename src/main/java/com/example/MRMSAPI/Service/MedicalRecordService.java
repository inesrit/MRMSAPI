package com.example.MRMSAPI.Service;


import com.example.MRMSAPI.Dto.LoginDTO;
import com.example.MRMSAPI.Entity.MedicalRecord;
import com.example.MRMSAPI.Entity.Patient;
import com.example.MRMSAPI.Entity.User;
import com.example.MRMSAPI.Repo.MedicalRecordRepo;
import com.example.MRMSAPI.Repo.PatientRepo;
import com.example.MRMSAPI.response.LoginResponse;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/*
Medical record service class
*/

@Service
public class MedicalRecordService {

    @Autowired
    private MedicalRecordRepo medicalRecordRepo;

    public MedicalRecord createMedicalRecord(Patient patient, User user, String recordDate, String recordName, String recordType, String recordResult) {
        MedicalRecord medicalRecord = new MedicalRecord();
        medicalRecord.setPatient(patient);
        medicalRecord.setUser(user);
        medicalRecord.setRecordDate(recordDate);
        medicalRecord.setRecordName(recordName);
        medicalRecord.setRecordResult(recordResult);
        medicalRecord.setRecordType(recordType);
        return medicalRecordRepo.save(medicalRecord);
    }

    public void updateMedicalRecord(MedicalRecord updatedMedicalRecord) {
        MedicalRecord existingMedicalRecord = medicalRecordRepo.findById(updatedMedicalRecord.getMedicalrecordid())
                .orElseThrow(() -> new EntityNotFoundException("Medical record not found"));


        existingMedicalRecord.setRecordDate(updatedMedicalRecord.getRecordDate());
        existingMedicalRecord.setRecordName(updatedMedicalRecord.getRecordName());
        existingMedicalRecord.setRecordType(updatedMedicalRecord.getRecordType());
        existingMedicalRecord.setRecordResult(updatedMedicalRecord.getRecordResult());


        medicalRecordRepo.save(existingMedicalRecord);
    }

    public void deleteMedicalRecord(int medicalRecordId) {
        try {
            medicalRecordRepo.deleteByMedicalRecordId(medicalRecordId);
        } catch (EmptyResultDataAccessException e) {

            throw new EntityNotFoundException("Medical record with ID " + medicalRecordId + " not found");
        } catch (Exception e) {

            e.printStackTrace();
            throw new RuntimeException("Failed to delete medical record");
        }
    }

    public MedicalRecord getMedicalRecordById(int recordId) {
        return medicalRecordRepo.findById(recordId)
                .orElseThrow(() -> new EntityNotFoundException("Medical record not found"));
    }

    public List<MedicalRecord> getAllMedicalRecords() {
        return medicalRecordRepo.findAll();
    }

    public List<MedicalRecord> getAllMedicalRecordsByPatientId(int patientId) {
        return medicalRecordRepo.findAllByPatient_Patientid(patientId);
    }

    public List<MedicalRecord> getAllMedicalRecordsByUserId(int userId) {
        return medicalRecordRepo.findAllByUser_Userid(userId);
    }
}
