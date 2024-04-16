package com.example.MRMSAPI.response;

import com.example.MRMSAPI.Entity.Patient;
import com.example.MRMSAPI.Entity.User;

public class LoginResponse {
    String message;
    Boolean status;

    Patient patient;

    User user;


    public LoginResponse(String message, Boolean status) {
        this.message = message;
        this.status = status;
    }

    public LoginResponse(String message, Boolean status, Patient patient) {
        this(message, status);
        this.patient = patient;
    }

    public LoginResponse(String message, Boolean status, User user) {
        this(message, status);
        this.user = user;
    }

    public LoginResponse() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
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

    @Override
    public String toString() {
        if (patient != null) {
            return "LoginResponse{" +
                    "message='" + message + '\'' +
                    ", status=" + status +
                    ", patient=" + patient +
                    '}';
        } else if (user != null) {
            return "LoginResponse{" +
                    "message='" + message + '\'' +
                    ", status=" + status +
                    ", user=" + user +
                    '}';
        } else {
            return "LoginResponse{" +
                    "message='" + message + '\'' +
                    ", status=" + status +
                    '}';
        }
    }
}
