package com.example.backend.dto;

public class UserLoginResponse {
    private boolean success;
    private int userId;
    private String email;
    private String name;
    private String password;

    public UserLoginResponse(boolean success, int userId, String email, String name, String password) {
        this.success = success;
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.password = password;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
