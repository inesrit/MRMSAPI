package com.example.MRMSAPI.Entity;

import com.example.MRMSAPI.Enum.RequestStatus;
import jakarta.persistence.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.List;

/*
Access Request Entity class
*/

@Entity
@Table(name = "access_request")
public class AccessRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @Enumerated(EnumType.STRING)
    private RequestStatus status;

    public AccessRequest() {
    }

    public AccessRequest(Long id, User user, Patient patient, RequestStatus status) {
        this.id = id;
        this.user = user;
        this.patient = patient;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "AccessRequest{" +
                "id=" + id +
                ", user=" + user +
                ", patient=" + patient +
                ", status=" + status +
                '}';
    }
}
