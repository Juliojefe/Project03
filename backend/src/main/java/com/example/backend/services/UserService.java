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
import java.util.Objects;
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
        Optional<User> user = userRepository.findById(request.getUserId());
        if (user.isPresent()) {
            User tempUser = user.get();
            tempUser.setName(request.getName());
            userRepository.save(tempUser);
            logger.info("User name updated logged successfully");
            return true;
        }
        logger.warn("User with id:{} was not found", request.getUserId());
        return false;
    }

    public boolean updateEmail(UpdateEmailRequest request) {
        Optional<User> idUser = userRepository.findById(request.getUserId());
        Optional<User> emailUser = userRepository.findByEmail(request.getEmail());
        if (idUser.isPresent() && emailUser.isPresent()) {
            User numUser = idUser.get();
            User strUser = emailUser.get();
            if (numUser.getUserId() != strUser.getUserId()) {
                logger.warn("email in use");
                return false;
            }
            numUser.setEmail(request.getEmail());
            userRepository.save(numUser);
            logger.info("email update successfully");
            return true;
        }
        if (idUser.isPresent()) {
            User tempUser = idUser.get();
            tempUser.setEmail(request.getEmail());
            userRepository.save(tempUser);
            logger.info("email update successfully");
            return true;
        }
        logger.warn("User with id:{} was not found", request.getUserId());
        return false;
    }

    public boolean updatePassword(UpdatePasswordRequest request) {
        Optional<User> user = userRepository.findById(request.getUserId());
        if (user.isPresent()) {
            User tempUser = user.get();
            String oldPassword = request.getOldPassword();
            String storedHashedPassword = tempUser.getPassword();
            String newPassword = request.getNewPassword();
            if (passwordEncoder.matches(oldPassword, storedHashedPassword)) {
                tempUser.setPassword(passwordEncoder.encode(newPassword));
                userRepository.save(tempUser);
                logger.info("password update successfully");
                return true;
            }
        }
        logger.warn("password mismatch or non-existent user with id:{}", request.getUserId());
        return false;
    }

    public boolean makeAdmin(MakeAdminRequest request) {
        Optional<User> user = userRepository.findById(request.getUserId());
        if (user.isPresent()) {
            User tempUser = user.get();
            tempUser.setUserType(UserType.admin);
            userRepository.save(tempUser);
            return true;
        }
        logger.warn("User with id:{} was not found", request.getUserId());
        return false;
    }

    public boolean makeMechanic(MakeMechanicRequest request) {
        Optional<User> user = userRepository.findById(request.getUserId());
        if (user.isPresent()) {
            User tempUser = user.get();
            tempUser.setUserType(UserType.mechanic);
            userRepository.save(tempUser);
            return true;
        }
        logger.warn("User with id:{} was not found", request.getUserId());
        return false;
    }

    public boolean makeRegularUser(MakeRegularUserRequest request) {
        Optional<User> user = userRepository.findById(request.getUserId());
        if (user.isPresent()) {
            User tempUser = user.get();
            tempUser.setUserType(UserType.regular_user);
            userRepository.save(tempUser);
            return true;
        }
        logger.warn("User with id:{} was not found", request.getUserId());
        return false;
    }

    public boolean updateProfilePic(UpdateProfilePicRequest request) {
        Optional<User> user = userRepository.findById(request.getUserId());
        if (user.isPresent()) {
            User tempUser = user.get();
            tempUser.setProfilePic(request.getPictureUrl());
            userRepository.save(tempUser);
            return true;
        }
        logger.warn("User with id:{} was not found", request.getUserId());
        return false;
    }

    public boolean deleteUser(DeleteUserRequest request) {
        Optional<User> user = userRepository.findById(request.getUserId());
        if (user.isPresent()) {
            User tempUser = user.get();
            userRepository.delete(tempUser);
            return true;
        }
        logger.warn("User with id:{} was not found", request.getUserId());
        return false;
    }
}
