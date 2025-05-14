package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/mechanic-requests")
    public List<User> getPendingMechanicRequests() {
        return userRepository.findByMechanicRequestPendingTrue();
    }

    @PostMapping("/approve/{id}")
    public ResponseEntity<String> approveMechanic(@PathVariable int id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setMechanic(true);
            user.setMechanicRequestPending(false);
            userRepository.save(user);
            return ResponseEntity.ok("Approved");
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/decline/{id}")
    public ResponseEntity<String> declineMechanic(@PathVariable int id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setMechanic(false);
            user.setMechanicRequestPending(false);
            userRepository.save(user);
            return ResponseEntity.ok("Declined");
        }
        return ResponseEntity.notFound().build();
    }
}
