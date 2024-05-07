package com.example.MRMSAPI.Repo;

import com.example.MRMSAPI.Entity.Appointment;
import com.example.MRMSAPI.Entity.MedicalRecord;
import com.example.MRMSAPI.Entity.Patient;
import com.example.MRMSAPI.Entity.Prescription;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.*;

/*
Appointment Data JPA repository class
*/

@EnableJpaRepositories
@Repository
public interface AppointmentRepo  extends JpaRepository<Appointment, Integer> {

    List<Appointment> findAllByPatient_Patientid(int patientId);

    List<Appointment> findAllByUser_Userid(int userId);

    List<Appointment> findAllByUser_UseridAndAppDate(int userId, LocalDate appDate);

    @Transactional
    @Modifying
    @Query("DELETE FROM Appointment m WHERE m.appointmentid = :appointmentId")
    void deleteByAppointmentId(@Param("appointmentId") int appointmentId);

}
