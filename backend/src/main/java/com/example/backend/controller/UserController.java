package com.example.backend.controller;

import com.example.backend.dto.*;
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

    @PatchMapping("/update-name/{id}/name")
    public boolean updateUserName(@RequestBody UpdateNameRequest request) {
        return userService.updateName(request);
    }

    @PatchMapping("update-email/{id}/email")
    public boolean updateEmail(@RequestBody UpdateEmailRequest request) {
        return userService.updateEmail(request);
    }

    @PatchMapping("update-password/{id}/password")
    public boolean updatePassword(@RequestBody UpdatePasswordRequest request) {
        return userService.updatePassword(request);
    }

    @PatchMapping("make-admin/{id}")
    public boolean makeAdmin(@RequestBody MakeAdminRequest request) {
        return userService.makeAdmin(request);
    }

    @PatchMapping("make-mechanic/{id}")
    public boolean makeMechanic(@RequestBody MakeMechanicRequest request) {
        return userService.makeMechanic(request);
    }

    @PatchMapping("make-regular-user/{id}")
    public boolean makeRegularUser(@RequestBody MakeRegularUserRequest request) {
        return userService.makeRegularUser(request);
    }

    @PatchMapping("update-profile-pic/{id}/url-new-pic")
    public boolean updateProfilePic(@RequestBody UpdateProfilePicRequest request) {
        return userService.updateProfilePic(request);
    }

    @DeleteMapping("/delete-user/{id}")
    public boolean deleteUser(@RequestBody DeleteUserRequest request) {
        return userService.deleteUser(request);
    }

}