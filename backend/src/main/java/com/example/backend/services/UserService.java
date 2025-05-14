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

import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public boolean registerUser(UserRegisterRequest request) {
        String password = request.getPassword();
        String regex = "^[A-Za-z\\d@$!%*?&#^]{6,}$";

        if (!password.matches(regex)) {
            System.out.println("❌ Rejected: Invalid password = " + password);
            return false;
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            System.out.println("❌ Rejected: Email already exists = " + request.getEmail());
            return false;
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setUserType(request.getUserTypeAsEnum()); // ✅ Handles lowercase input
        user.setProfilePic("");

        userRepository.save(user);
        System.out.println("✅ Registered user: " + request.getEmail());
        return true;
    }

    public User loginUser(UserLoginRequest request) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

        if (userOptional.isEmpty()) {
            System.out.println("User not found for email: " + request.getEmail());
            return null;
        }

        User user = userOptional.get();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            System.out.println("Incorrect password for: " + request.getEmail());
            return null;
        }

        return user;
    }

    public boolean updateName(UpdateNameRequest request) {
        Optional<User> user = userRepository.findById(request.getUserId());
        if (user.isPresent()) {
            User tempUser = user.get();
            tempUser.setName(request.getName());
            userRepository.save(tempUser);
            return true;
        }
        return false;
    }

    public boolean updateEmail(UpdateEmailRequest request) {
        Optional<User> idUser = userRepository.findById(request.getUserId());
        Optional<User> emailUser = userRepository.findByEmail(request.getEmail());
        if (idUser.isPresent() && emailUser.isPresent()) {
            User numUser = idUser.get();
            User strUser = emailUser.get();
            if (!Objects.equals(numUser.getUserId(), strUser.getUserId())) {
                return false;
            }
            numUser.setEmail(request.getEmail());
            userRepository.save(numUser);
            return true;
        }
        if (idUser.isPresent()) {
            User tempUser = idUser.get();
            tempUser.setEmail(request.getEmail());
            userRepository.save(tempUser);
            return true;
        }
        return false;
    }

    public boolean updatePassword(UpdatePasswordRequest request) {
        Optional<User> user = userRepository.findById(request.getUserId());
        if (user.isPresent()) {
            User tempUser = user.get();
            if (passwordEncoder.matches(request.getOldPassword(), tempUser.getPassword())) {
                tempUser.setPassword(passwordEncoder.encode(request.getNewPassword()));
                userRepository.save(tempUser);
                return true;
            }
        }
        return false;
    }

    public boolean makeAdmin(MakeAdminRequest request) {
        Optional<User> user = userRepository.findById(request.getUserId());
        if (user.isPresent()) {
            user.get().setUserType(UserType.ADMIN); // ✅ Enum now uppercase
            userRepository.save(user.get());
            return true;
        }
        return false;
    }

    public boolean makeMechanic(MakeMechanicRequest request) {
        Optional<User> user = userRepository.findById(request.getUserId());
        if (user.isPresent()) {
            user.get().setUserType(UserType.MECHANIC);
            userRepository.save(user.get());
            return true;
        }
        return false;
    }

    public boolean makeRegularUser(MakeRegularUserRequest request) {
        Optional<User> user = userRepository.findById(request.getUserId());
        if (user.isPresent()) {
            user.get().setUserType(UserType.REGULAR_USER);
            userRepository.save(user.get());
            return true;
        }
        return false;
    }

    public boolean updateProfilePic(UpdateProfilePicRequest request) {
        Optional<User> user = userRepository.findById(request.getUserId());
        if (user.isPresent()) {
            user.get().setProfilePic(request.getPictureUrl());
            userRepository.save(user.get());
            return true;
        }
        return false;
    }

    public boolean deleteUser(DeleteUserRequest request) {
        Optional<User> user = userRepository.findById(request.getUserId());
        if (user.isPresent()) {
            userRepository.delete(user.get());
            return true;
        }
        return false;
    }
}
