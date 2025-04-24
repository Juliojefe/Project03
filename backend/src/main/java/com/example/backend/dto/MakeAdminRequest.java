package com.example.backend.dto;

public class MakeAdminRequest {
    String userId;

    public MakeAdminRequest(String userId) {
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
