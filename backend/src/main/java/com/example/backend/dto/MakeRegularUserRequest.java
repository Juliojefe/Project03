package com.example.backend.dto;

public class MakeRegularUserRequest {
    private int userId;

    public MakeRegularUserRequest(int userId) {
        this.userId = userId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
