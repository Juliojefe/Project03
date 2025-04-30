package com.example.backend.controller;

import com.example.backend.dto.UserLoginRequest;
import com.example.backend.dto.UserLoginResponse;
import com.example.backend.dto.UserRegisterRequest;
import com.example.backend.model.User;
import com.example.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public boolean register(@RequestBody UserRegisterRequest request) {
        return userService.registerUser(request);
    }

    @PostMapping("/login")
    public UserLoginResponse loginUser(@RequestBody UserLoginRequest request) {
        return userService.loginUser(request);
    }

    @GetMapping("/")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }


}