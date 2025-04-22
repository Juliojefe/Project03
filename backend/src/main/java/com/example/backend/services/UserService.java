package com.example.backend.services;

import com.example.backend.dto.*;
import com.example.backend.enums.UserType;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public boolean registerUser(UserRegisterRequest request) {
        Optional<User> tempUser = userRepository.findByEmail(request.getEmail());
        if (tempUser.isPresent()) {
            logger.warn("Registration failed: User with email {} already exists", request.getEmail());
            return false;
        }
        User newUser = new User();
        newUser.setEmail(request.getEmail());
        newUser.setUserType(request.getUserType());
        newUser.setName(request.getName());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(newUser);
        logger.info("User with email {} registered successfully", request.getEmail());
        return true;
    }

    public UserLoginResponse loginUser(UserLoginRequest request) {
        Optional<User> tempUser = userRepository.findByEmail(request.getEmail());
        if (tempUser.isPresent() && passwordEncoder.matches(request.getPassword(), tempUser.get().getPassword())) {
            logger.info("User with email {} logged in successfully", request.getEmail());
            User user = tempUser.get();
            return new UserLoginResponse(true, user.getUserId(), user.getEmail(), user.getName(), user.getPassword());
        } else {
            logger.warn("Authentication failed for email {}: Incorrect email or password", request.getEmail());
            return new UserLoginResponse(false, 0, null, null, null);
        }
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    public boolean updateName(UpdateNameRequest request) {
        //  TODO
        return false;
    }

    public boolean updateEmail(UpdateEmailRequest request) {
        //  TODO
        return false;
    }

    public boolean updatePassword(UpdatePasswordRequest request) {
        //  TODO
        return false;
    }

    public boolean makeAdmin(MakeAdminRequest request) {
        //  TODO
        return false;
    }

    public boolean makeMechanic(MakeMechanicRequest request) {
        //  TODO
        return false;
    }

    public boolean makeRegularUser(MakeRegularUserRequest request) {
        //  TODO
        return false;
    }

    public boolean updateProfilePic(UpdateProfilePicRequest request) {
        //  TODO
        return false;
    }
}
