package com.taskmanager.backend.dto;

public class LoginResponse {

    private String email;
    private String role;

    // Default constructor
    public LoginResponse() {
    }

    // Constructor
    public LoginResponse(String email, String role) {
        this.email = email;
        this.role = role;
    }

    // Getter
    public String getEmail() {
        return email;
    }

    // Setter
    public void setEmail(String email) {
        this.email = email;
    }

    // Getter
    public String getRole() {
        return role;
    }

    // Setter
    public void setRole(String role) {
        this.role = role;
    }
}