package com.example.backend.dto;

import com.example.backend.enums.UserType;
import com.fasterxml.jackson.annotation.JsonProperty;

public class UserRegisterRequest {

    @JsonProperty("name")
    private String name;

    @JsonProperty("email")
    private String email;

    @JsonProperty("password")
    private String password;

    @JsonProperty("userType")
    private String userType; // store raw string for lowercase

    public UserRegisterRequest() {}

    public UserRegisterRequest(String name, String email, String password, String userType) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.userType = userType;
    }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }

    public String getUserTypeRaw() { return userType; }

    public void setUserType(String userType) { this.userType = userType; }

    public UserType getUserTypeAsEnum() {
        return UserType.fromValue(userType); // ✅ Correct
    }
    
}
