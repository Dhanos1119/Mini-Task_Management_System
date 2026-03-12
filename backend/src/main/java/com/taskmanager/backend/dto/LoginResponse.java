package com.taskmanager.backend.dto;

public class LoginResponse {

    private Long id;
    private String email;
    private String role;
    private String token;

    // Default constructor
    public LoginResponse() {
    }

    // Constructor
    public LoginResponse(Long id, String email, String role, String token) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.token = token;
    }

    // GET ID
    public Long getId() {
        return id;
    }

    // SET ID
    public void setId(Long id) {
        this.id = id;
    }

    // GET EMAIL
    public String getEmail() {
        return email;
    }

    // SET EMAIL
    public void setEmail(String email) {
        this.email = email;
    }

    // GET ROLE
    public String getRole() {
        return role;
    }

    // SET ROLE
    public void setRole(String role) {
        this.role = role;
    }

    // GET TOKEN
    public String getToken() {
        return token;
    }

    // SET TOKEN
    public void setToken(String token) {
        this.token = token;
    }
}