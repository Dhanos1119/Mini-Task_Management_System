package com.taskmanager.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanager.backend.dto.LoginRequest;
import com.taskmanager.backend.dto.LoginResponse;
import com.taskmanager.backend.dto.RegisterRequest;
import com.taskmanager.backend.entity.User;
import com.taskmanager.backend.repository.UserRepository;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(401).body("Invalid password");
        }

        LoginResponse response =
                new LoginResponse(user.getEmail(), user.getRole());

        return ResponseEntity.ok(response);
    }


    @PostMapping("/register")
public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

    User user = new User();
    user.setEmail(request.getEmail());
    user.setPassword(request.getPassword());
    user.setRole(request.getRole());

    userRepository.save(user);

    return ResponseEntity.ok("User registered successfully");
}
}